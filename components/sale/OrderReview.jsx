import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import "../../utils/global";
import Loading from "../../components/Loading";
import { getDocumentById } from "../../utils/actions";

export default function OrderReview() {
  const [listArticles, setListArticles] = useState([]);
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [quantityUnities, setQuantityUnities] = useState(0);
  const [subTotal, setSubTotal] = useState(0.0);
  const [taxes, setTaxes] = useState(0.0);
  const [totalValue, setTotalValue] = useState(0.0);
  const [clientId, setClientId] = useState();
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState();

  const countUnities = () => {
    listArticles.map((article) => {
      const unities = parseInt(quantityUnities) + parseInt(article.quantity);
      setQuantityUnities(unities);
    });
  };

  const countProducts = () => {
    setQuantityProducts(parseInt(listArticles.length));
  };

  const calculateSubtotal = () => {
    listArticles.map((article) => {
      const sub = parseInt(article.quantity) * parseFloat(article.price);
      setSubTotal(subTotal + sub);
    });
    let taxes = parseFloat(subTotal) * 0.19;
    setTaxes(taxes);
    let total = parseFloat(subTotal) + parseFloat(taxes);
    setTotalValue(total);
  };

  const calculateTaxes = () => {};

  const calculateTotal = () => {};

  const clear = () => {
    setListArticles([]);
    setQuantityProducts(0);
    setQuantityUnities(0);
    setSubTotal(0);
    setTaxes(0);
    setTotalValue(0);
  };

  useFocusEffect(
    useCallback(async () => {
      setLoading(true);
      const response = await getDocumentById("clients", clientId);
      if (response.statusResponse) {
        setClient(response.document);
      }
      setLoading(false);
    }, [clientId])
  );
  useFocusEffect(
    useCallback(() => {
      clear();
      setListArticles(global.listArticles);
      setClientId(global.clientId);

      countUnities();
      countProducts();
      calculateSubtotal();
      calculateTaxes();
      calculateTotal();
    }, [listArticles])
  );

  return (
    <View style={styles.viewOrder}>
      <View style={styles.viewTexts}>
        <Text style={styles.description}>
          <Text style={styles.title}>Cliente:</Text> {client && client.name}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Dirección:</Text>{" "}
          {client && client.address}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Productos:</Text> {quantityProducts}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Unidades:</Text> {quantityUnities}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>SubTotal:</Text> {subTotal}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>IVA:</Text> {subTotal && taxes}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Total:</Text> {subTotal && totalValue}
        </Text>
      </View>
      <Button
        title="Enviar"
        buttonStyle={styles.btnSendArticle}
        titleStyle={styles.btnTitleSendArticle}
        // onPress={SendArticle}
      />
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewOrder: {
    marginTop: 30,
  },
  viewTexts: {
    marginHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 25,
    color: "#fff",
  },
  btnSendArticle: {
    width: "60%",
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: "#CCDB33",
    paddingVertical: 10,
    alignSelf: "center",
  },
  btnTitleSendArticle: {
    color: "#000",
  },
});
