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
        options={{
          title: "Ventas",
          headerTitleContainerStyle: {
            backgroundColor: "#5b5b5b",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: "center",
            paddingHorizontal: 10,
            borderTopWidth: 2,
            borderColor: "#CCDB33",
          },
          headerTitleStyle: { color: "#CCDB33" },
        }}
      />
    </Stack.Navigator>
  );
}
