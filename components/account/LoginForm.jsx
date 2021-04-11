import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
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
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
        color="white"
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu constraseña"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        color="white"
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
        titleStyle={styles.textButton}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doLogin()}
      />
      <Loading isVisible={loading} text="Iniciando sesión..." />
    </ScrollView>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "" };
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#CCDB33",
    borderRadius: 20,
  },
  icon: {
    color: "#C1C1C1",
  },

  textButton: {
    color: "#000",
    fontWeight: "bold",
  },
});
