import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from "../../screens/products/Products";
import Detail from "../sale/Detail";
import Order from "../sale/Order";

const Tab = createMaterialTopTabNavigator();

export default function Sales({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Productos" component={Products} />
      <Tab.Screen name="Detalle" component={Detail} />
      <Tab.Screen name="Resumen" component={Order} />
    </Tab.Navigator>
  );
}
