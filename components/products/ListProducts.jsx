import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Divider, Image, Input, Button } from "react-native-elements";
import Modal from "../Modal";
import CarouselImage from "../../components/CarouselImage";
import "../../utils/global";

const widthScreen = Dimensions.get("window").width;

export default function ListProducts({ products, handleLoadMore }) {
  const [showModal, setShowModal] = useState(false);
  const [wordToSearch, setWordToSearch] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalBody, setModalBody] = useState([]);
  const [listArticles, setListArticles] = useState([]);
  const widthImages = (widthScreen * 85) / 100;

  const addArticleToSale = async () => {
    setListArticles([...listArticles, modalBody]);
    global.listArticles = [...global.listArticles, modalBody];
    setShowModal(false);
  };

  const onChange = (e, type) => {
    setModalBody({ ...modalBody, [type]: e.nativeEvent.text });
  };

  return (
    <View>
      {/* <Input
        placeholder="   Buscar producto"
        onChange={(e) => setWordToSearch(e.nativeEvent.text)}
        style={styles.search}
      /> */}

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        renderItem={(product) => (
          <Product
            product={product}
            setShowModal={setShowModal}
            setModalBody={setModalBody}
          />
        )}
      />
      <Modal isVisible={showModal} setVisible={setShowModal}>
        <CarouselImage
          images={modalBody.images}
          height={300}
          width={widthImages}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
        <View style={{ marginTop: 10 }}>
          <Text>
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
          <Text>
            <Text style={styles.textTitleModal}>Stock: </Text>
            {modalBody.stock}
          </Text>
          <Input
            placeholder="Ingresar cantidad"
            onChange={(e) => onChange(e, "quantity")}
            keyboardType="number-pad"
          />
          <Button
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
          />
        </View>
      </Modal>
    </View>
  );
}

const Product = ({ product, setShowModal, setModalBody }) => {
  const { id, reference, images, description, price, stock } = product.item;

  const imageProduct = images[0];

  const goOptionsProduct = () => {
    const modalBody = () => {
      const body = {
        id,
        reference,
        images,
        description,
        price,
        stock,
      };
      return body;
    };
    setModalBody(modalBody);
    setShowModal(true);
  };

  const onPress = () => goOptionsProduct();

  return (
    <>
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
              <Text style={styles.textTitleModal}>Descripción: </Text>
              {description}
            </Text>

            <Text style={styles.productInformation}>
              <Text style={styles.textTitleModal}>Precio: </Text> {price}
            </Text>
            <Text style={styles.productInformation}>
              <Text style={styles.textTitleModal}>Stock: </Text> {stock}
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
  textTitleModal: {
    fontWeight: "bold",
  },
  btnAddArticle: {
    backgroundColor: "#CCDB33",
  },
  btnTitleAddArticle: {
    color: "#000",
  },
});
