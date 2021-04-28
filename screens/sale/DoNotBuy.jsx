import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";
import Loading from "../../components/Loading";
import { getCurrentUser, getReasonsDoNotBuy } from "../../utils/actions";
import { size } from "lodash";
import ListDoNotBuy from "../../components/DoNotBuy/ListDoNotBuy";

export default function DoNotBuy({ navigation }) {
  const [user, setUser] = useState(null);
  const [reasons, setReasons] = useState();
  const [reasonSelected, setReasonSelected] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(async () => {
      async function getData() {
        setLoading(true);
        const response = await getReasonsDoNotBuy(getCurrentUser().uid);
        if (response.statusResponse) {
          setReasons(response.reasons);
        }
        setLoading(false);
      }
      getData();
    }, [])
  );

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {size(reasons) > 0 ? (
        <ListDoNotBuy reasons={reasons} navigation={navigation} />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>
            No se encontraron motivos de no compra en el sistema.
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
