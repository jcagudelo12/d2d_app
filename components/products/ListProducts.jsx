import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Divider, Image, Input, ListItem, Icon } from "react-native-elements";
import uuid from "random-uuid-v4";

import Modal from "../Modal";

export default function ListProducts({ products, navigation, handleLoadMore }) {
  const [showModal, setShowModal] = useState(false);
  const [productSelected, setProductSelected] = useState();
  return (
    <View>
      <Input
        placeholder="   Buscar producto"
        onChange={(e) => console.log(e.target.value)}
        style={styles.search}
      />

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        renderItem={(product) => (
          <Product
            product={product}
            navigation={navigation}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      />
    </View>
  );
}

const Product = ({
  product,
  navigation,
  productSelected,
  setProductSelected,
  showModal,
  setShowModal,
}) => {
  const { id, reference, images, description, price, stock } = product.item;

  const imageProduct = images[0];

  const goOptionsProduct = () => {
    setProductSelected(id);
    setShowModal(true);
  };

  const onPress = () => goOptionsProduct();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.viewProduct}>
        <View style={styles.viewProductImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#ffffff" />}
            source={{ uri: imageProduct }}
            style={styles.imageProduct}
          />
        </View>
        <View style={styles.viewProductInformation}>
          <Text style={styles.productTitle}>{reference}</Text>
          <Text style={styles.productInformation}>
            Descripción: {description}
          </Text>

          <Text style={styles.productInformation}>Precio: {price}</Text>
          <Text style={styles.productInformation}>Stock: {stock}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Modal isVisible={showModal} setVisible={setShowModal}>
        <Text style={styles.productTitle}>{reference}</Text>
        <Text style={styles.productInformation}>
          Descripción: {description}
        </Text>

        <Text style={styles.productInformation}>Precio: {price}</Text>
        <Text style={styles.productInformation}>Stock: {stock}</Text>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: "row",
    margin: 10,
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
});
