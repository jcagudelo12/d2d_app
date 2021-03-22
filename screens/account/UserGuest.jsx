import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cuál te ha gustado más y
        comenta cómo ha sido tu experiencia.
      </Text>
      <Button
        title="Ver tu perfil"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("login")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
  },
  image: {
    height: 400,
    width: "100%",
    marginTop: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    marginBottom: 10,
    color: "#a65273",
  },
  button: {
    backgroundColor: "#CCDB33",
    borderRadius: 20,
  },
});
