import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SalesStack from "./SalesStack";
import TransmissionsStack from "./TransmissionsStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="sales"
          component={SalesStack}
          options={{ title: "Ventas" }}
        />
        <Tab.Screen
          name="transmissions"
          component={TransmissionsStack}
          options={{ title: "Transmisiones" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
