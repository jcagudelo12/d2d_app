import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Clients from "../screens/client/Clients";
import Client from "../screens/client/Client";
import AddClient from "../screens/client/AddClient";

const Stack = createStackNavigator();

export default function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="clients"
        component={Clients}
        options={{
          title: "Gestión de Clientes",
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
        name="add-client"
        component={AddClient}
        options={{
          title: "Crear Clientes",
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
        name="client"
        component={Client}
        options={{
          // title: "Crear Clientes",
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
