import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { Swing } from "react-native-animated-spinkit";

export default function Loading({ isVisible, text }) {
  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <Swing size={80} color="#CCDB33" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 120,
    width: 240,
    backgroundColor: "#fff",
    borderColor: "#CCDB33",
    borderWidth: 1,
    borderRadius: 10,
  },

  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#000",
  },
});
