import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from "../../screens/products/Products";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function Sales() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Productos" component={Products} />
      <Tab.Screen name="Detalle" component={SettingsScreen} />
      <Tab.Screen name="Resumen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
});
