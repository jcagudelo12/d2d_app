import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";
import Loading from "../../components/Loading";
import {
  getCurrentUser,
  getOrdersSended,
  getDocumentById,
} from "../../utils/actions";
import { size } from "lodash";
import ListOrders from "../../components/orders/ListOrders";

export default function OrdersSended({ navigation }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(async () => {
      setLoading(true);
      const response = await getOrdersSended(getCurrentUser().uid);
      if (response.statusResponse) {
        setOrders(response.orders);
      }
      setLoading(false);
    }, [])
  );

  // useFocusEffect(
  //   useCallback(async () => {
  //     setLoading(true);
  //     await Promise.all(
  //       orders.map(async (order, index) => {
  //         console.log(order.client);
  //         const response = await getDocumentById("clients", order.client);
  //         order["clientInformation"] = response.document;
  //         setNewOrders([...newOrders, order]);
  //         console.log("index", index);
  //       })
  //     );
  //     setLoading(false);
  //   }, [])
  // );

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {size(orders) > 0 ? (
        <ListOrders orders={orders} navigation={navigation} />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>
            Aún no haz realizados pedidos el día de hoy.
          </Text>
        </View>
      )}
      {/* {user && (
        <Icon
          type="material-community"
          name="account-plus"
          color="#CCDB33"
          reverse
          reverseColor={"#474747"}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-product")}
        />
      )} */}
      <Loading isVisible={loading} text="Cargando pedidos realizados..." />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
