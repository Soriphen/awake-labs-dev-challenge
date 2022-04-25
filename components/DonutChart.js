import { Box, Text, VStack } from "native-base";
import { StyleSheet, TextInput } from "react-native";
import * as React from "react";
import Svg, { G, Circle } from "react-native-svg";

export default function Donut({
  percentage = 75,
  radius = 100,
  strokeWidth = 10,
  color = "tomato",
  textColor,
  max = 100,
}) {
  const halfCircle = radius + strokeWidth; // Full radius of the donut including the width of the stroke
  const circleCircumference = 2 * Math.PI * radius;
  const maxPerc = (100 * percentage) / max; // Percentage of the circumference that the donut should be filled, relative to max
  const strokeDashoffset =
    circleCircumference - (circleCircumference * maxPerc) / 100; // Filled part of the donut

  return (
    <Box>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeOpacity={0.2}
            fill="transparent"
          ></Circle>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          ></Circle>
        </G>
      </Svg>
      <VStack style={[StyleSheet.absoluteFill, { top: radius / 1.7 }]}>
        <TextInput
          editable={false}
          style={[
            { color: textColor ?? color },
            { fontSize: radius / 2 },
            { textAlign: "center" },
          ]}
          defaultValue={`${percentage}%`}
        ></TextInput>
        <Text
          style={[
            { color: textColor ?? color },
            { fontSize: radius / 5 },
            { fontWeight: "500" },
            { textAlign: "center" },
          ]}
        >
          Anxiety
        </Text>
      </VStack>
    </Box>
  );
}
