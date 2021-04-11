import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Divider, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/account/LoginForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  return (
    <KeyboardAwareScrollView style={styles.containerKeyBoardAware}>
      <Image
        source={require("../../assets/icon.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container}>
        <LoginForm />
        <Divider style={styles.divider} />
        <Button
          icon={
            <Icon
              type="material-community"
              name="whatsapp"
              size={20}
              color={"#fff"}
            />
          }
          containerStyle={styles.btnWhatsappContainer}
          buttonStyle={styles.btnWhatsapp}
          onPress={() => {
            console.log("melo");
          }}
        ></Button>
        <CreateAccount />
      </View>
    </KeyboardAwareScrollView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();
  return (
    <Text
      style={styles.register}
      onPress={() => navigation.navigate("register")}
    >
      ¿Aún no tienes cuenta? <Text style={styles.btnRegister}>Regístrate</Text>
    </Text>
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
  divider: {
    backgroundColor: "#CCDB33",
    margin: 40,
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center",
    color: "white",
  },
  btnRegister: {
    color: "#CCDB33",
    fontWeight: "bold",
  },
  btnWhatsappContainer: {
    alignSelf: "flex-end",
  },
  btnWhatsapp: {
    backgroundColor: "#00BB2D",
    borderRadius: 15,
  },
});
