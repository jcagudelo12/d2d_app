import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { getCurrentUser } from "../utils/actions";

import ClientStack from "./ClientStack";
import TransmissionsStack from "./TransmissionsStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  // const [user, setUser] = useState(null);

  // useEffect(() => setUser(getCurrentUser()), []);

  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "clients":
        iconName = "account-group";
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
      {/* {user && ( */}
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
          name="clients"
          component={ClientStack}
          options={{ title: "Clientes" }}
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
      {/* )} */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
