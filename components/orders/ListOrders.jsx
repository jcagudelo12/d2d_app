import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Divider, Icon } from "react-native-elements";
import Modal from "../Modal";
import { getDocumentById } from "../../utils/actions";
import { size } from "lodash";

export default function ListOrders({ orders }) {
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [client, setClient] = useState();

  return (
    <View>
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
          <Text>Detalle</Text>
          {/* {details.map((info) => {
            <>
              <Text>
                <Text>Referencia: </Text>
                {info.reference}
              </Text>
              <Text>
                <Text>Descripción: </Text>
                {info.description}
              </Text>
              <Text>
                <Text>Precio: </Text>
                {info.price}
              </Text>
            </>;
          })} */}
        </View>
      </Modal>
    </View>
  );
}

const Order = ({ order, setShowModal, setModalBody }) => {
  const {
    id,
    client,
    // clientInformation,
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
        details,
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
          <View tyle={styles.viewIconOrders}>
            <Icon
              type="material-community"
              name="view-list-outline"
              size={30}
              color={"#CCDB33"}
            />
          </View>
          <View style={styles.viewOrderInformation}>
            <Text style={styles.productInformation}>Nombre del Cliente</Text>
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
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  viewProduct: {
    // flexDirection: "row",
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
  viewClientImage: {
    marginRight: 15,
  },
  viewOrderInformation: {
    width: "100%",
    paddingRight: 4,
  },
});
