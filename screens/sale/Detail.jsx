import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Order() {
  const [product, setProduct] = useState();

  console.log(product);
  return <View></View>;
}

const styles = StyleSheet.create({});
