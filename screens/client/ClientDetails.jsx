import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, ScrollView, View } from "react-native";
import CarouselImage from "../../components/CarouselImage";
import Loading from "../../components/Loading";
import MapView from "react-native-maps";
import { getDocumentById } from "../../utils/actions";
import { formatPhone, getCurrentLocation } from "../../utils/helpers";
import { Button } from "react-native-elements";
import { _ScrollView } from "react-native";

const widthScreen = Dimensions.get("window").width;

export default function ClientDetails({ navigation, route }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRegion, setNewRegion] = useState(null);

  const { clientSelected } = route.params;
  useFocusEffect(
    useCallback(async () => {
      setLoading(true);
      const response = await getDocumentById("clients", clientSelected);
      if (response.statusResponse) {
        setClientInfo(response.document);
      }

      setLoading(false);
    }, [])
  );

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const {
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
  const maps = () => {
    setShowModal(true);
  };
  return (
    <ScrollView style={styles.viewBody}>
      <Loading isVisible={loading} />
      <CarouselImage
        images={images}
        height={250}
        width={widthScreen}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <View style={styles.containerText}>
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
      </View>
      <View style={styles.mapView}>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            pitchEnabled={true}
            showsCompass={true}
            liteMode={false}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={name.concat(" - ", address)}
              image={require("../../assets/pin.png")}
            />
            {newRegion && (
              <MapView.Marker
                coordinate={{
                  latitude: newRegion.latitude,
                  longitude: newRegion.longitude,
                }}
                title={"Mi ubicación actual"}
              />
            )}
          </MapView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
  },
  containerText: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  mapView: {
    marginVertical: 30,
  },
  mapStyle: {
    marginHorizontal: 5,
    width: "80%",
    height: 550,
    alignSelf: "center",
  },
});
