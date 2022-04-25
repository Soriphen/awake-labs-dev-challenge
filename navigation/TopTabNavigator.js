import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MeasureScreen from "../screens/MeasureScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          top: 50,
          bottom: 0,
          left: 0,
          right: 0,
          height: 45,
          shadowOffset: { height: 0 },
          shadowRadius: 0,
          shadowOpacity: 0,
          elevation: 0,
          backgroundColor: "#f8fafc",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "tomato",
        },
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="Measure" component={MeasureScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
    </Tab.Navigator>
  );
}
