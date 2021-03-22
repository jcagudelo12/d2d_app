import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Sales from "../screens/sale/Sales";
import Transmissions from "../screens/tramsmission/Transmissions";
import Account from "../screens/account/Account";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="sales"
          component={Sales}
          options={{ title: "Ventas" }}
        />
        <Tab.Screen
          name="transmissions"
          component={Transmissions}
          options={{ title: "Transmiciones" }}
        />
        <Tab.Screen
          name="account"
          component={Account}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
