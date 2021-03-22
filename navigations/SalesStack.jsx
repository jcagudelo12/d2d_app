import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Sales from "../screens/sale/Sales";

const Stack = createStackNavigator();

export default function SalesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sales"
        component={Sales}
        options={{ title: "Ventas" }}
      />
    </Stack.Navigator>
  );
}
