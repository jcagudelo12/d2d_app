import React, { useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { Button, Icon, Input, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";

import { validateEmail } from "../../utils/helpers";
import { loginWhithEmailAndPassword } from "../../utils/actions";
import Loading from "../Loading";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doLogin = async () => {
    if (!validateData()) {
      return;
    }
    setLoading(true);
    const result = await loginWhithEmailAndPassword(
      formData.email,
      formData.password
    );
    setLoading(false);
    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }
    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes de ingresar un email valido");
      isValid = false;
    }

    if (isEmpty(formData.password)) {
      setErrorPassword("Debes ingrear una contraseña");
      isValid = false;
    }

    return isValid;
  };

  return (
    <ScrollView centerContent style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu constraseña"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doLogin()}
      />
      <Loading isVisible={loading} text="Iniciando sesión..." />
      <Divider style={styles.divider} />
      <Button
        icon={
          <Icon
            type="material-community"
            name="whatsapp"
            size={60}
            color={"#fff"}
          />
        }
        containerStyle={styles.btnWhatsappContainer}
        buttonStyle={styles.btnWhatsapp}
        onPress={() => {
          console.log("melo");
        }}
      ></Button>
    </ScrollView>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "" };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  image: {
    height: 200,
    width: "100%",
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#01004f",
    borderRadius: 20,
  },
  icon: {
    color: "#C1C1C1",
  },
  divider: {
    backgroundColor: "#CCDB33",
    margin: 40,
  },
  btnWhatsappContainer: {
    marginTop: 20,
    width: 100,
    height: 100,
    alignSelf: "flex-end",
  },
  btnWhatsapp: {
    backgroundColor: "#00BB2D",
    borderRadius: 20,
  },
});
