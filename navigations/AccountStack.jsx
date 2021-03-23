import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Account from "../screens/account/Account";
import Login from "../screens/account/Login";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Cuenta",
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
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesión" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
