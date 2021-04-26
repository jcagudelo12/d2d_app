import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersSended from "../transmission/OrdersSended";
import Score from "../transmission/Score";
import MadeToday from "../transmission/MadeToday";

const Tab = createMaterialTopTabNavigator();

export default function Transmissions() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Realizados" component={OrdersSended} />
      <Tab.Screen name="Score" component={Score} />
      <Tab.Screen name="Resumen Dia" component={MadeToday} />
    </Tab.Navigator>
  );
}
