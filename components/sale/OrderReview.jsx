import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import "../../utils/global";
import Loading from "../../components/Loading";
import {
  getDocumentById,
  addDocumentWithoutId,
  getCurrentUser,
} from "../../utils/actions";
import { getCurrentLocation } from "../../utils/helpers";
import { size } from "lodash";

export default function OrderReview({ navigation }) {
  const [listArticles, setListArticles] = useState([]);
  const [quantityProducts, setQuantityProducts] = useState(0);
  const [quantityUnities, setQuantityUnities] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [taxes, setTaxes] = useState();
  const [totalValue, setTotalValue] = useState();
  const [clientId, setClientId] = useState();
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState();
  const [region, setRegion] = useState(null);

  const countUnities = () => {
    listArticles.map((article) => {
      const unities = parseInt(quantityUnities) + parseInt(article.quantity);
      setQuantityUnities(unities);
    });
  };

  const countProducts = () => {
    setQuantityProducts(parseInt(listArticles.length));
  };

  const calculateTaxes = async () => {
    const taxes = parseFloat(subTotal) * 0.19;
    setTaxes(taxes);
  };

  const calculateTotal = async () => {
    const total = parseFloat(subTotal) + parseFloat(subTotal) * 0.19;
    setTotalValue(total);
  };

  const calculateSubtotal = () => {
    listArticles.map((article) => {
      const sub = parseInt(article.quantity) * parseFloat(article.price);
      setSubTotal(subTotal + sub);
    });
  };

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
      async function getClients() {
        setLoading(true);
        const response = await getDocumentById("clients", clientId);
        if (response.statusResponse) {
          setClient(response.document);
        }
        setLoading(false);
      }
      getClients();
    }, [clientId])
  );

  useFocusEffect(
    useCallback(async () => {
      async function calculateValues() {
        calculateTaxes();
        calculateTotal();
      }
      calculateValues();
    }, [subTotal])
  );

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        clear();
        setListArticles(global.listArticles);
        setClientId(global.clientId);
        countUnities();
        countProducts();
        calculateSubtotal();
      }
      getData();
    }, [listArticles])
  );
  const order = {
    createAt: "",
    createdBy: "",
    client: "",
    location: [],
    details: [],
    subTotalValue: "",
    tax: "",
    totalOrder: "",
  };
  const sendOrder = async () => {
    setLoading(true);
    const response = await getCurrentLocation();
    if (response.status) {
      order.location = response.location;
    }
    order.createAt = new Date();
    order.createdBy = getCurrentUser().uid;
    order.client = clientId;
    order.details = listArticles;
    order.subTotalValue = subTotal;
    order.tax = taxes;
    order.totalOrder = totalValue;

    const responseAddDocument = await addDocumentWithoutId("orders", order);
    setLoading(false);
    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar el cliente, por favor intenta más tarde.",
        3000
      );
      return;
    }
    global.listArticles = [];
    global.clientId = "";
    clear();
    setClientId();
    setClient();
    setLoading(false);
    navigation.navigate("clients");
  };

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
          <Text style={styles.title}>IVA:</Text> {taxes}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.title}>Total:</Text> {totalValue}
        </Text>
      </View>
      <Button
        title="Enviar"
        buttonStyle={styles.btnSendArticle}
        titleStyle={styles.btnTitleSendArticle}
        onPress={sendOrder}
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
