import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from "../../screens/products/Products";
import Detail from "../sale/Detail";
import Order from "../sale/Order";

const Tab = createMaterialTopTabNavigator();

export default function Sales({ navigation }) {
  console.log(navigation.navigate);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Productos" component={Products} />
      <Tab.Screen name="Detalle" component={Detail} />
      <Tab.Screen name="Resumen" component={Order} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
