import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Divider, Image, Input, Button } from "react-native-elements";
import Modal from "../Modal";
import { getDocumentById } from "../../utils/actions";

export default function ListOrders({ orders }) {
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [client, setClient] = useState();

  return (
    <View>
      {/* <Input
        placeholder="   Buscar producto"
        onChange={(e) => setWordToSearch(e.nativeEvent.text)}
        style={styles.search}
      /> */}

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.2}
        renderItem={(order) => (
          <Order
            order={order}
            setShowModal={setShowModal}
            setModalBody={setModalBody}
          />
        )}
      />
      <Modal isVisible={showModal} setVisible={setShowModal}>
        <View style={{ marginTop: 10 }}>
          <Text>Hola</Text>
          {/* <Text>
            <Text style={styles.textTitleModal}>Referencia: </Text>
            {modalBody.reference}
          </Text>
          <Text>
            <Text style={styles.textTitleModal}>Descripción: </Text>
            {modalBody.description}
          </Text>

          <Text>
            <Text style={styles.textTitleModal}>Precio: </Text>
            {modalBody.price}
          </Text>
          <Input
            placeholder="Ingresar cantidad"
            onChange={(e) => onChange(e, "quantity")}
            keyboardType="number-pad"
          /> */}
          {/* <Button
            buttonStyle={styles.btnAddArticle}
            title="Agregar producto"
            titleStyle={styles.btnTitleAddArticle}
            onPress={() => {
              addArticleToSale();
            }}
            icon={{
              type: "material-community",
              name: "plus-circle",
              color: "#000",
            }}
          /> */}
        </View>
      </Modal>
    </View>
  );
}

const Order = ({ order, setShowModal, setModalBody }) => {
  const {
    id,
    client,
    createAt,
    createdBy,
    details,
    location,
    subTotalValue,
    tax,
    totalOrder,
  } = order.item;

  const goOptionsOrder = () => {
    const modalBody = () => {
      const body = {
        id,
        client,
        details,
        subTotalValue,
        tax,
        totalOrder,
      };
      return body;
    };
    setModalBody(modalBody);
    setShowModal(true);
  };

  const onPress = () => goOptionsOrder();

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.viewOrder}>
          <View style={styles.viewOrderInformation}>
            <Text style={styles.orderTitle}>{client}</Text>
            <Text style={styles.productInformation}>
              <Text style={styles.textTitleModal}>SubTotal: </Text>{" "}
              {subTotalValue}
            </Text>
            <Text style={styles.productInformation}>
              <Text style={styles.textTitleModal}>IVA: </Text> {tax}
            </Text>
            <Text style={styles.productInformation}>
              <Text style={styles.textTitleModal}>Total: </Text> {totalOrder}
            </Text>
          </View>
          {/* <Button
            buttonStyle={styles.btnAddArticle}
            titleStyle={styles.btnTitleAddArticle}
            // onPress={() => {
            //   addArticleToSale();
            // }}
            icon={{
              type: "material-community",
              name: "view-list-outline",
              color: "#000",
            }}
          /> */}
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: "row",
    margin: 10,
    marginRight: 100,
  },
  viewProductImage: {
    marginRight: 15,
  },
  viewProductInformation: {
    width: "100%",
    paddingRight: 4,
  },
  imageProduct: {
    width: 100,
    height: 100,
  },
  productTitle: {
    fontWeight: "bold",
    color: "white",
  },
  productInformation: {
    paddingTop: 2,
    color: "white",
  },
  productDescription: {
    paddingTop: 2,
    color: "white",
    width: "75%",
  },
  divider: {
    backgroundColor: "#CCDB33",
    margin: 2,
  },
  search: {
    color: "white",
    borderColor: "#CCDB33",
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 10,
  },
  textTitleModal: {
    fontWeight: "bold",
  },
  btnAddArticle: {
    backgroundColor: "#CCDB33",
    width: 60,
  },
  btnTitleAddArticle: {
    color: "#000",
  },
});
