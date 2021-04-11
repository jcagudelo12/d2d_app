import { size } from "lodash";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Divider, Image } from "react-native-elements";
import { formatPhone } from "../../utils/helpers";

import Modal from "../Modal";

export default function ListClients({ clients, navigation, handleLoadMore }) {
  return (
    <View>
      <FlatList
        data={clients}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        renderItem={(client) => (
          <Client client={client} navigation={navigation} />
        )}
      />
    </View>
  );
}

const Client = ({ client, navigation }) => {
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
  } = client.item;

  const imageClient = images[0];
  const [isVisibleOption, setIsVisibleOption] = useState(false);
  // const goOptionsClient = () => {
  //   //setIsVisibleOption(true);

  //   return (
  <Modal isVisible={isVisibleOption} setIsVisible={setIsVisibleOption}>
    <View>
      <Text>lista...</Text>
    </View>
  </Modal>;
  //navigation.navigate("client", { id, name });
  //   );
  // };
  return (
    <TouchableOpacity onPress={() => setIsVisibleOption(true)}>
      <View style={styles.viewClient}>
        <View style={styles.viewClientImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#ffffff" />}
            source={{ uri: imageClient }}
            style={styles.imageClient}
          />
        </View>
        <View style={styles.viewClientInformation}>
          <Text style={styles.clientTitle}>{name}</Text>
          <Text style={styles.clientInformation}>Cupo: {quota}</Text>
          <Text style={styles.clientInformation}>
            Celular: {formatPhone(callingCode, phone)}
          </Text>
          <Text style={styles.clientInformation}>Dirección: {address}</Text>
          <Text style={styles.clientInformation}>Email: {email}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewClient: {
    flexDirection: "row",
    margin: 10,
  },
  viewClientImage: {
    marginRight: 15,
  },
  viewClientInformation: {
    width: "100%",
    paddingRight: 4,
  },
  imageClient: {
    width: 100,
    height: 100,
  },
  clientTitle: {
    fontWeight: "bold",
    color: "white",
  },
  clientInformation: {
    paddingTop: 2,
    color: "white",
  },
  clientDescription: {
    paddingTop: 2,
    color: "white",
    width: "75%",
  },
  divider: {
    backgroundColor: "#CCDB33",
    margin: 2,
  },
});
