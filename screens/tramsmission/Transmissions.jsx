import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersSended from "./OrdersSended";
import Score from "../tramsmission/Score";
import MadeToday from "../tramsmission/MadeToday";

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
