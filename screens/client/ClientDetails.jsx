import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, ScrollView, View } from "react-native";
import CarouselImage from "../../components/CarouselImage";
import Loading from "../../components/Loading";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getDocumentById } from "../../utils/actions";
import { formatPhone, getCurrentLocation } from "../../utils/helpers";
import { _ScrollView } from "react-native";

const widthScreen = Dimensions.get("window").width;

export default function ClientDetails({ navigation, route }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newRegion, setNewRegion] = useState(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyAv0JUUZFp9ymN4FEeI98lYO7LewPclJpU";

  const { clientSelected } = route.params;
  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getDocumentById("clients", clientSelected);
        if (response.statusResponse) {
          setClientInfo(response.document);
        }

        setLoading(false);
      }
      getData();
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
        height={300}
        width={widthScreen}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <View style={styles.mapView}>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            liteMode={false}
            showsBuildings={true}
          >
            {newRegion && (
              <>
                <MapView.Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={name.concat(" - ", address)}
                  image={require("../../assets/pin.png")}
                />
                <MapView.Marker
                  coordinate={{
                    latitude: newRegion.latitude,
                    longitude: newRegion.longitude,
                  }}
                  title={"Mi ubicación actual"}
                />
                <MapViewDirections
                  origin={newRegion}
                  destination={location}
                  strokeWidth={5}
                  strokeColor="#CCDB33"
                  optimizeWaypoints={true}
                  apikey={GOOGLE_MAPS_APIKEY}
                />
              </>
            )}
          </MapView>
        )}
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
  },
  containerText: {
    marginHorizontal: 10,
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  mapView: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mapStyle: {
    marginHorizontal: 2,
    width: "95%",
    height: 200,
    alignSelf: "center",
  },
});
