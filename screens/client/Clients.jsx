import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";
import moment from "moment";
import Loading from "../../components/Loading";
import {
  getCurrentUser,
  getClients,
  getMoreClients,
} from "../../utils/actions";
import { size } from "lodash";
import ListClients from "../../components/clients/ListClients";

moment.locale("es");

export default function Clients({ navigation }) {
  const [user, setUser] = useState(null);
  const [startClient, setStartClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const limitClients = 6;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getClients(limitClients, getCurrentUser().uid);
        if (response.statusResponse) {
          setStartClient(response.startClient);
          setClients(response.clients);
        }
        setLoading(false);
      }
      getData();
    }, [])
  );

  const handleLoadMore = async () => {
    if (!startClient) {
      return;
    }

    setLoading(true);
    const response = await getMoreClients(
      limitClients,
      startClient,
      getCurrentUser().uid
    );
    if (response.statusResponse) {
      setStartClient(response.startClient);
      setClients([...clients, ...response.clients]);
    }
    setLoading(false);
  };

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return (
    <View style={styles.viewBody}>
      {size(clients) > 0 ? (
        <ListClients
          clients={clients}
          navigation={navigation}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>
            Aún no hay clientes registrados.
          </Text>
        </View>
      )}
      {user && (
        <Icon
          type="material-community"
          name="account-plus"
          color="#CCDB33"
          reverse
          reverseColor={"#474747"}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-client")}
        />
      )}
      <Loading isVisible={loading} text="Cargando clientes..." />
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
  },
});
