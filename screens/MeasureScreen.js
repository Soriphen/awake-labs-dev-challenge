import React from "react";
import { Text, HStack, Center, VStack } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Donut from "../components/DonutChart";

export default function MeasureScreen() {
  const data = require("../assets/Data for Mobile:FE.json");

  const anxietyState = "HIGH";
  const anxietyLevel = data[0].anxietyLevel;
  const currentBpm = data[0].currentBpm;

  const anxietyColor = (anxietyState) => {
    if (anxietyState === "NORMAL") {
      return "#0437F2";
    } else if (anxietyState === "LOW") {
      return "#32CD32";
    } else if (anxietyState === "MEDIUM") {
      return "#FFA500";
    } else if (anxietyState === "HIGH") {
      return "#E32636";
    }
  };

  const [anxietyColorState, setAnxietyColorState] = React.useState(
    anxietyColor(anxietyState)
  );

  return (
    <Center px={4} flex={1} bgColor="blueGray.50">
      <VStack space={5} alignItems="center">
        <Donut color={anxietyColorState} percentage={50} />
        <HStack space={1} alignItems="center">
          <MaterialCommunityIcons
            name="heart-pulse"
            size={32}
            color={anxietyColorState}
          />
          <Text fontWeight="bold" color={anxietyColorState} fontSize={20}>
            {currentBpm}
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
}
