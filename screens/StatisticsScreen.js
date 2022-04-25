import React from "react";
import { Text, HStack, Center, VStack, Box } from "native-base";
import Svg, { Path } from "react-native-svg";
import { Dimensions, Animated, StyleSheet, TextInput } from "react-native";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";

import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";

export default function StatisticsScreen() {
  const data = require("../assets/Data for Mobile:FE.json");
  const [x, setX] = React.useState(new Animated.Value(0));
  const cursorRef = React.useRef();
  const labelRef = React.useRef();

  // Create x and y axis data array holding objects where x is the date and y is the anxiety level
  const parsedData = data.reduce((final, d, i) => {
    // date as YYYY-MM-DDT00:00:00Z
    const date = new Date(d.createdAt.$date);

    /* Methods on Date Object will convert from UTC to users timezone, so we 
    set minutes to current minutes (UTC) + User local time UTC offset
    so that we can use methods on the date obj without the timezone conversion */
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const anxietyLevel = d.anxietyLevel;

    final.push({ x: date, y: anxietyLevel });
    return final;
  }, []);

  // Shorten the parsed data array to only show the last 10 entries
  const shortenedParsedData = parsedData.slice(0, 10);

  // Create an array of the y values from the shortened parsed data array
  const shortenedParsedDataAnxietyLabel = shortenedParsedData.map((d) => d.y);

  // Create an array of the y values from the shortened parsed data array
  const shortenedParsedDataDateLabel = shortenedParsedData.map((d) => d.x);

  console.log(shortenedParsedDataDateLabel);

  const endOfDataLength = shortenedParsedData.length - 1;
  const anxietyLevelMax = 100;

  const d3 = {
    shape,
  };

  const height = 200;
  const { width } = Dimensions.get("window");
  const cursorRadius = 10;
  const verticalPadding = 5;
  const labelWidth = 178;

  // Create the x and y scales where x is the date and y is the anxiety level
  const scaleX = scaleTime()
    .domain([shortenedParsedData[endOfDataLength].x, shortenedParsedData[0].x])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([0, anxietyLevelMax])
    .range([height - verticalPadding, verticalPadding]);

  // Create a label showing discrete data from shortenedParsedDataAnxietyLabel for the x axis
  const scaleAnxietyLabel = scaleQuantile()
    .domain([0, anxietyLevelMax])
    .range(shortenedParsedDataAnxietyLabel);

  const scaleDateLabel = scaleQuantile()
    .domain([0, endOfDataLength])
    .range(shortenedParsedDataDateLabel);

  // Create the line
  const line = d3.shape
    .line()
    .x((d) => scaleX(d.x))
    .y((d) => scaleY(d.y))
    .curve(d3.shape.curveBasis)(parsedData.slice(0, 10));

  // Get the length of the line
  const properties = path.svgPathProperties(line);
  const lineLength = properties.getTotalLength();

  const translateX = x.interpolate({
    inputRange: [0, lineLength],
    outputRange: [width - labelWidth, 0],
    extrapolate: "clamp",
  });

  // Create the animation for the cursor
  const moveCursor = (value) => {
    const { x, y } = properties.getPointAtLength(value);

    // To ensure that the cursor is centered on the line
    cursorRef.current.setNativeProps({
      top: y - cursorRadius,
      left: x - cursorRadius,
    });

    const anxietyLabel = scaleAnxietyLabel(scaleY.invert(y));
    const dateLabel = scaleDateLabel(scaleY.invert(y));
    // Fix incorrect timezone bug that occurs when converting to string from date object
    // dateLabel.setMinutes(
    //   dateLabel.getMinutes() + dateLabel.getTimezoneOffset()
    // );
    console.log(dateLabel);
    labelRef.current.setNativeProps({
      text: `${anxietyLabel}% Anxiety\n${dateLabel}`,
    });
  };

  // Add the listener to the animated value
  React.useEffect(() => {
    x.addListener(({ value }) => {
      moveCursor(value);
    });

    // Have the cursor start at the right end of the line
    moveCursor(0);

    return () => {
      x.removeAllListeners();
    };
  }, []);

  return (
    <Center px={4} flex={1} bgColor="blueGray.50">
      <Box style={{ marginTop: 60, width: width, height: height }}>
        <Svg width={width} height={height}>
          <Path d={line} stroke="tomato" strokeWidth={3} fill="transparent" />
          <Box
            ref={cursorRef}
            w={`${cursorRadius * 2}px`}
            h={`${cursorRadius * 2}px`}
            borderRadius={cursorRadius * 2}
            borderColor="tomato"
            borderWidth={3}
            backgroundColor="blueGray.50"
          ></Box>
        </Svg>
        <Animated.View
          style={{
            backgroundColor: "lightgray",
            position: "absolute",
            top: -55,
            left: 0,
            width: labelWidth,
            height: 45,
            transform: [{ translateX }],
          }}
        >
          <TextInput multiline={true} ref={labelRef} />
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x } } }],
            {
              useNativeDriver: true,
            }
          )}
          horizontal
        />
      </Box>
    </Center>
  );
}
