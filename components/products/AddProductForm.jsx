import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Avatar, Button, Icon, Input, Image } from "react-native-elements";
import { map, size, filter, isEmpty } from "lodash";
import uuid from "random-uuid-v4";

import { loadImageFromGallery } from "../../utils/helpers";
import {
  addDocumentWithoutId,
  getCurrentUser,
  uploadImage,
} from "../../utils/actions";

const widthScreen = Dimensions.get("window").width;

export default function AddProductForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorReference, setErrorReference] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorPrice, setErrorPrice] = useState(null);
  const [errorStock, setErrorStock] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  const addProduct = async () => {
    if (!validForm()) {
      return;
    }

    setLoading(true);
    const responseUploadImages = await uploadImages();

    const product = {
      reference: formData.reference,
      description: formData.description,
      price: formData.price,
      images: responseUploadImages,
    };

    const responseAddDocument = await addDocumentWithoutId("products", product);
    setLoading(false);
    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar el producto, por favor intenta más tarde.",
        3000
      );
      return;
    }

    navigation.navigate("products");
  };

  const uploadImages = async () => {
    const imageUrl = [];

    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await uploadImage(image, "Products", uuid());
        response.statusResponse && imageUrl.push(response.url);
      })
    );
    return imageUrl;
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;

    if (isEmpty(formData.reference)) {
      setErrorReference("Debes ingresar la referencia del producto.");
      isValid = false;
    }
    if (isEmpty(formData.description)) {
      setErrorDescription("Debes ingresar la descripción del producto.");
      isValid = false;
    }
    if (isEmpty(formData.price)) {
      setErrorPrice("Debes ingresar el precio del producto.");
      isValid = false;
    }
    // if (size(imagesSelected) === 0) {
    //   toastRef.current.show(
    //     "Debes de agregar al menos una imagen al producto.",
    //     3000
    //   );
    //   isValid = false;
    // }
    return isValid;
  };

  const clearErrors = () => {
    setErrorReference(null);
    setErrorDescription(null);
    setErrorPrice(null);
    setErrorStock(null);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageProduct imageProduct={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorReference={errorReference}
        errorDescription={errorDescription}
        errorPrice={errorPrice}
        errorStock={errorStock}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Crear Producto"
        titleStyle={{ color: "#000" }}
        onPress={addProduct}
        buttonStyle={styles.btnAddProduct}
      />
    </ScrollView>
  );
}

const ImageProduct = ({ imageProduct }) => {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageProduct
            ? { uri: imageProduct }
            : require("../../assets/no-image.png")
        }
      />
    </View>
  );
};

const UploadImage = ({ toastRef, imagesSelected, setImagesSelected }) => {
  const imageSelect = async () => {
    const response = await loadImageFromGallery([4, 3]);
    if (!response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen", 3000);
      return;
    }
    setImagesSelected([...imagesSelected, response.image]);
  };
  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que quieres eliminar la imagen?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  return (
    <ScrollView horizontal style={styles.viewImage}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageProduct, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageProduct }}
          onPress={() => removeImage(imageProduct)}
        />
      ))}
    </ScrollView>
  );
};

const FormAdd = ({
  formData,
  setFormData,
  errorReference,
  errorDescription,
  errorPrice,
  errorStock,
}) => {
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Referencia del producto..."
        defaultValue={formData.reference}
        onChange={(e) => onChange(e, "reference")}
        errorMessage={errorReference}
      />
      <Input
        placeholder="Descripción del producto..."
        defaultValue={formData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
      <Input
        placeholder="Precio del producto..."
        defaultValue={formData.price}
        onChange={(e) => onChange(e, "price")}
        errorMessage={errorPrice}
      />
    </View>
  );
};

const defaultFormValues = () => {
  return {
    reference: "",
    description: "",
    price: "",
    // stock: "",
  };
};

const styles = StyleSheet.create({});
