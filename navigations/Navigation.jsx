import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import SalesStack from "./SalesStack";
import TransmissionsStack from "./TransmissionsStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "sales":
        iconName = "cart-arrow-down";
        break;
      case "transmissions":
        iconName = "cube-send";
        break;
      case "account":
        iconName = "account-circle-outline";
        break;
    }
    return (
      <Icon type="material-community" name={iconName} size={30} color={color} />
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: "#4A4A4A",
          activeTintColor: "#CCDB33",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
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
