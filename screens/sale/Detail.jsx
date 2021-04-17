import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function Detail() {
  return (
    <View>
      <Button
        title="Ver pedido"
        // onPress={() => {
        //   console.log("getdata: ", getData("pedido"));
        // }}
        icon={{
          type: "material-community",
          name: "plus-circle",
          color: "#000",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
