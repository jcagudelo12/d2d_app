import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
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
      <Icon
        type="material-community"
        name={iconName}
        size={40}
        color={color === "#CCDB33" ? "#CCDB33" : "#fff"}
        reverse={color === "#CCDB33" ? true : false}
        reverseColor={color === "#CCDB33" && "#474747"}
      />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          inactiveTintColor: "#fff",
          activeTintColor: "#CCDB33",
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: "#5b5b5b",
            borderTopWidth: 0,
          },
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
          options={{ title: "Enviado" }}
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

const styles = StyleSheet.create({});
