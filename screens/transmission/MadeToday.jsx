import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getCurrentUser,
  getNotVisitSended,
  getOrdersSended,
} from "../../utils/actions";
import { size } from "lodash";
import Loading from "../../components/Loading";

export default function MadeToday() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [quantityOrders, setQuantityOrders] = useState(0);
  const [quantityNotVisit, setQuantityNotVisit] = useState(0);
  const [total, setTotal] = useState(0);

  const totalValue = async () => {
    orders.map((order) => {
      setTotal(parseFloat(total) + parseFloat(order.totalOrder));
    });
  };

  useFocusEffect(
    useCallback(async () => {
      async function getData() {
        setLoading(true);
        const responseOne = await getNotVisitSended(getCurrentUser().uid);
        if (responseOne.statusResponse) {
          setQuantityNotVisit(responseOne.notVisits.length);
        }

        setLoading(false);
      }
      getData();
    }, [])
  );

  useFocusEffect(
    useCallback(async () => {
      async function getData() {
        setLoading(true);

        const response = await getOrdersSended(getCurrentUser().uid);
        if (response.statusResponse) {
          setOrders(response.orders);
          setQuantityOrders(orders.length);
          totalValue();
        }

        setLoading(false);
      }
      getData();
    }, [])
  );
  return (
    <View style={styles.viewBody}>
      <View style={styles.viewHeader}>
        <Text style={styles.titleHeader}>Resumen de día</Text>
      </View>
      <View style={styles.viewDescription}>
        <Text style={styles.name}>{getCurrentUser().displayName}</Text>
        <Text style={styles.description}>
          Pedidos: {quantityOrders && quantityOrders}
        </Text>
        <Text style={styles.description}>Valor de los pedidos: {total}</Text>
        <Text style={styles.description}>Recaudos: {}</Text>
        <Text style={styles.description}>Valor de los recaudos: {}</Text>
        <Text style={styles.description}>No visitas: {quantityNotVisit}</Text>
      </View>
      <Loading isVisible={loading} text="Cargando datos..." />
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
