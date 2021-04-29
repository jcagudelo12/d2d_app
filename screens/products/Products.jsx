import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";
import Loading from "../../components/Loading";
import { getProducts, getMoreProducts } from "../../utils/actions";
import "../../utils/global";
import { size } from "lodash";
import ListProducts from "../../components/products/ListProducts";

export default function Products({ navigation }) {
  const [user, setUser] = useState(null);
  const [startProduct, setStartProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const limitProducts = 6;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getProducts(limitProducts);
        if (response.statusResponse) {
          setStartProduct(response.startProduct);
          setProducts(response.products);
        }
        setLoading(false);
      }
      getData();
    }, [])
  );

  const handleLoadMore = async () => {
    if (!startProduct) {
      return;
    }
    setLoading(true);

    const response = await getMoreProducts(limitProducts, startProduct);
    if (response.statusResponse) {
      setStartProduct(response.startProduct);
      setProducts([...products, ...response.products]);
    }
    setLoading(false);
  };

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {size(products) > 0 ? (
        <ListProducts
          products={products}
          navigation={navigation}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>
            Aún no hay productos registrados.
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
      <Loading isVisible={loading} text="Cargando productos..." />
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
