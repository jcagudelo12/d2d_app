import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ClientDestails({ navigation, route }) {
  const { id, name } = route.params;

  return (
    <View>
      <Text>{id}</Text>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
