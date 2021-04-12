import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListProducts({ navigation, route }) {
  const { id, name } = route.params;
  console.log(id, name);
  return (
    <View>
      <Text>ListProductssdasd...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
