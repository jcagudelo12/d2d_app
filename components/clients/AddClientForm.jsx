import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Avatar, Button, Icon, Input, Image } from "react-native-elements";
// import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter, isEmpty } from "lodash";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";

import {
  getCurrentLocation,
  loadImageFromGallery,
  validateEmail,
} from "../../utils/helpers";
import {
  addDocumentWithoutId,
  getCurrentUser,
  uploadImage,
} from "../../utils/actions";
import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;

export default function AddClientForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationClient, setLocationClient] = useState(null);

  const addClient = async () => {
    if (!validForm()) {
      return;
    }

    setLoading(true);
    const responseUploadImages = await uploadImages();
    const client = {
      name: formData.name,
      address: formData.address,
      callingCode: formData.callingCode,
      phone: formData.phone,
      location: locationClient,
      images: responseUploadImages,
      createAt: new Date(),
      createdBy: getCurrentUser().uid,
    };

    const responseAddDocument = await addDocumentWithoutId("Clients", client);
    setLoading(false);
    console.log(responseAddDocument);
    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar el cliente, por favor intenta más tarde.",
        3000
      );
      return;
    }

    navigation.navigate("clients");
  };

  const uploadImages = async () => {
    const imageUrl = [];

    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await uploadImage(image, "Clients", uuid());
        response.statusResponse && imageUrl.push(response.url);
      })
    );
    return imageUrl;
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;

    if (isEmpty(formData.name)) {
      setErrorName("Debes ingresar el nombre del cliente.");
      isValid = false;
    }
    if (isEmpty(formData.address)) {
      setErrorAddress("Debes ingresar la dirección del cliente.");
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar el email del cliente.");
      isValid = false;
    }
    if (size(formData.phone) < 10) {
      setErrorPhone("Debes ingresar un teléfono de cliente válido.");
      isValid = false;
    }

    if (!locationClient) {
      toastRef.current.show("Debes de localizar el cliente en el mapa.", 3000);
      isValid = false;
    } else if (size(imagesSelected) === 0) {
      toastRef.current.show(
        "Debes de agregar al menos una imagen al cliente.",
        3000
      );
      isValid = false;
    }
    return isValid;
  };

  const clearErrors = () => {
    setErrorEmail(null);
    setErrorName(null);
    setErrorPhone(null);
    setErrorAddress(null);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageClient imageClient={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
        errorPhone={errorPhone}
        setIsVisibleMap={setIsVisibleMap}
        locationClient={locationClient}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Crear Cliente"
        titleStyle={{ color: "#000" }}
        onPress={addClient}
        buttonStyle={styles.btnAddClient}
      />
      <MapClient
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationClient={setLocationClient}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

const MapClient = ({
  isVisibleMap,
  setIsVisibleMap,
  setLocationClient,
  toastRef,
}) => {
  const [newRegion, setNewRegion] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationClient(newRegion);
    toastRef.current.show("Ubicación guardada correctamente.", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {newRegion && (
          <MapView
            style={styles.mapStyle}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Cancelar"
            containerStyle={styles.viewMapsBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
          <Button
            title="Guardar"
            titleStyle={{ color: "#000" }}
            containerStyle={styles.viewMapsBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
        </View>
      </View>
    </Modal>
  );
};

const ImageClient = ({ imageClient }) => {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageClient
            ? { uri: imageClient }
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
      {map(imagesSelected, (imageClient, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageClient }}
          onPress={() => removeImage(imageClient)}
        />
      ))}
    </ScrollView>
  );
};

const FormAdd = ({
  formData,
  setFormData,
  errorName,
  errorEmail,
  errorAddress,
  errorPhone,
  setIsVisibleMap,
  locationClient,
}) => {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCallingCode] = useState("57");
  const [phone, setPhone] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del cliente..."
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="Dirección del cliente..."
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationClient ? "#442484" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Email del cliente..."
        keyboardType="email-address"
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      <View style={styles.phoneView}>
        {/* <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
            setCountry(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        /> */}
        <Input
          placeholder="WhatsApp del cliente..."
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
        />
      </View>
    </View>
  );
};

const defaultFormValues = () => {
  return {
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "CO",
    callingCode: "57",
  };
};
const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },
  viewForm: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  inputPhone: {
    width: "80%",
  },
  btnAddClient: {
    width: "60%",
    alignSelf: "center",
    margin: 20,
    backgroundColor: "#CCDB33",
    borderRadius: 20,
  },
  viewImage: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapsBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapsBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#474747",
    marginRight: 20,
  },
  viewMapBtnSave: {
    backgroundColor: "#CCDB33",
  },
});
