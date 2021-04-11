import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require("../../assets/icon.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de Vendedor</Text>
      <Text style={styles.description}>¿Animado para vender más que ayer?</Text>
      <Text style={styles.descriptionPhrase}>
        Recuerda que establecer metas es el primer paso para transformar lo
        invisible en visible.
      </Text>
      <Button
        title="Ver tu perfil"
        titleStyle={styles.btnShowProfile}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("login")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    paddingHorizontal: 30,
    backgroundColor: "#474747",
  },
  image: {
    height: 400,
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 10,
    textAlign: "center",
    color: "#fff",
  },
  description: {
    textAlign: "justify",
    color: "#fff",
    marginBottom: 0,
  },
  descriptionPhrase: {
    marginTop: 0,
    textAlign: "justify",
    marginBottom: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#CCDB33",
    borderRadius: 20,
    marginTop: 10,
  },
  btnShowProfile: {
    color: "#000",
  },
});
