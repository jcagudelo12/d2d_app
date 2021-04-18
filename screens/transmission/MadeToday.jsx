import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getCurrentUser } from "../../utils/actions";

export default function MadeToday() {
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewHeader}>
        <Text style={styles.titleHeader}>Resumen de día</Text>
      </View>
      <View style={styles.viewDescription}>
        <Text style={styles.name}>{getCurrentUser().displayName}</Text>
        <Text style={styles.description}>Pedidos: {}</Text>
        <Text style={styles.description}>Valor de los pedidos: {}</Text>
        <Text style={styles.description}>Recaudos: {}</Text>
        <Text style={styles.description}>Valor de los recaudos: {}</Text>
        <Text style={styles.description}>No visitas: {}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
    alignContent: "center",
  },
  viewHeader: {
    backgroundColor: "#CCDB33",
    width: "80%",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 10,
  },
  titleHeader: {
    fontSize: 40,
    alignSelf: "center",
  },
  viewDescription: {
    backgroundColor: "#CCDB33",
    width: "80%",
    alignSelf: "center",
    marginTop: 50,
    paddingVertical: 20,
    borderRadius: 20,
  },
  name: {
    fontSize: 25,
    color: "#000",
    alignSelf: "center",
  },
  description: {
    alignSelf: "center",
    marginTop: 20,
  },
});
