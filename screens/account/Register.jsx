import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import RegisterForm from "../../components/account/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register() {
  return (
    <KeyboardAwareScrollView style={styles.containerKeyBoardAware}>
      <Image
        source={require("../../assets/icon.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <RegisterForm />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  containerKeyBoardAware: {
    paddingHorizontal: 30,
    backgroundColor: "#474747",
  },
  image: {
    height: 200,
    width: "100%",
  },
});
