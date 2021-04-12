import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";
import React, { useState, useEffect, useCallback } from "react";
import { Alert, Dimensions, StyleSheet, Text, ScrollView } from "react-native";
import CarouselImage from "../../components/CarouselImage";
import Loading from "../../components/Loading";
import { getDocumentById } from "../../utils/actions";
import { formatPhone } from "../../utils/helpers";

const widthScreen = Dimensions.get("window").width;

export default function ClientDestails({ navigation, route }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const { clientSelected } = route.params;
  useFocusEffect(
    useCallback(async () => {
      setLoading(true);
      const response = await getDocumentById("clients", clientSelected);
      if (response.statusResponse) {
        setClientInfo(response.document);
        console.log(response.document);
      }
      setLoading(false);
    }, [])
  );
  const {
    id,
    nit,
    images,
    name,
    address,
    callingCode,
    phone,
    email,
    city,
    department,
    quota,
    paymentCondition,
    location,
  } = clientInfo;

  navigation.setOptions({ title: name });

  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImage
        images={images}
        height={250}
        width={widthScreen}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <Text style={styles.text}>Nombre: {name}</Text>
      <Text style={styles.text}>Nit: {nit}</Text>
      <Text style={styles.text}>Dirección: {address}</Text>
      <Text style={styles.text}>
        Teléfono: {formatPhone(callingCode, phone)}
      </Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Ciudad: {city}</Text>
      <Text style={styles.text}>Departamento: {department}</Text>
      <Text style={styles.text}>Cupo: {quota}</Text>
      <Text style={styles.text}>Condición de Pago: {paymentCondition}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
