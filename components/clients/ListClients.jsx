import { size } from "lodash";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { formatPhone } from "../../utils/helpers";

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
    // nit,
    name,
    address,
    callingCode,
    phone,
    // cellphone,
    // email,
    // city,
    // department,
    // quota,
    // paymentCondition,
    // location,
  } = client.item;

  //const imageClient = images[0];

  const goClient = () => {
    navigation.navigate("client", { id, name });
  };
  return (
    <TouchableOpacity onPress={goClient}>
      <View style={styles.viewClient}>
        {/* <View style={styles.viewClientImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#ffffff" />}
            source={{ uri: imageClient }}
            style={styles.imageClient}
          />
        </View> */}
        <View style={styles.viewClientInformation}>
          <Text style={styles.clientTitle}>{name}</Text>
          <Text style={styles.clientInformation}>{address}</Text>
          <Text style={styles.clientInformation}>
            {formatPhone(callingCode, phone)}
          </Text>
        </View>
      </View>
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
    width: 90,
    height: 90,
  },
  clientTitle: {
    fontWeight: "bold",
  },
  clientInformation: {
    paddingTop: 2,
    color: "grey",
  },
  clientDescription: {
    paddingTop: 2,
    color: "grey",
    width: "75%",
  },
});
