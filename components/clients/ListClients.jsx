import React, { useState } from "react";
import { map } from "lodash";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Divider, Image, ListItem, Icon } from "react-native-elements";
import { formatPhone } from "../../utils/helpers";
import uuid from "random-uuid-v4";

import Modal from "../Modal";
import ChangeEmailForm from "../account/ChangeEmailForm";
import ChangePasswordForm from "../account/ChangePasswordForm";
import ListProducts from "../sale/ListProducts";

export default function ListClients({ clients, navigation, handleLoadMore }) {
  const [showModal, setShowModal] = useState(false);
  const [clientSelected, setClientSelected] = useState();

  return (
    <View>
      <FlatList
        data={clients}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        renderItem={(client) => (
          <Client
            client={client}
            navigation={navigation}
            clientSelected={clientSelected}
            setClientSelected={setClientSelected}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      />
    </View>
  );
}

const Client = ({
  client,
  navigation,
  clientSelected,
  setClientSelected,
  showModal,
  setShowModal,
}) => {
  const [renderComponent, setRenderComponent] = useState(null);

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

  // const generateOptions = () => {
  //   return [
  //     {
  //       title: "Venta",
  //       iconNameLeft: "cart-arrow-down",
  //       iconColorLeft: "#474747",
  //       iconNameRight: "arrow-right-thick",
  //       iconColorRight: "#474747",
  //       onPress: () => selectedComponent("sale"),
  //     },
  //     {
  //       title: "Cartera y Recaudo",
  //       iconNameLeft: "cash-multiple",
  //       iconColorLeft: "#474747",
  //       iconNameRight: "arrow-right-thick",
  //       iconColorRight: "#474747",
  //       onPress: () => selectedComponent("email"),
  //     },
  //     {
  //       title: "No Compra",
  //       iconNameLeft: "cart-off",
  //       iconColorLeft: "#474747",
  //       iconNameRight: "arrow-right-thick",
  //       iconColorRight: "#474747",
  //       onPress: () => selectedComponent("doNotBuy"),
  //     },
  //     {
  //       title: "Datos del cliente",
  //       iconNameLeft: "information",
  //       iconColorLeft: "#474747",
  //       iconNameRight: "arrow-right-thick",
  //       iconColorRight: "#474747",
  //       onPress: () => selectedComponent("clientDetails"),
  //     },
  //   ];
  // };

  // const selectedComponent = (key) => {
  //   switch (key) {
  //     case "sale":
  //       {
  //         navigation.navigate("sale", { id });
  //       }
  //       break;
  //     case "clientDetails":
  //       navigation.navigate("clientDetails", { id });
  //       break;
  //     case "doNotBuy":
  //       navigation.navigate("doNotBuy", { id });
  //       break;
  //   }
  //   setShowModal(true);
  // };
  // const menuOptions = generateOptions();
  const goOptionsClient = () => {
    setClientSelected(id);
    setShowModal(true);
  };

  const onPress = () => goOptionsClient();

  return (
    <TouchableOpacity onPress={onPress}>
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
      <Modal isVisible={showModal} setVisible={setShowModal}>
        <ListItem
          key={uuid()}
          style={styles.menuItem}
          onPress={() => console.log("id heredado: ", clientSelected)}
        >
          <Icon
            type="material-community"
            name="cart-arrow-down"
            color="#474747"
          />
          <ListItem.Content>
            <ListItem.Title>Venta</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name="arrow-right-thick"
            color="#474747"
          />
        </ListItem>
        <ListItem
          key={uuid()}
          style={styles.menuItem}
          onPress={() =>
            navigation.navigate("clientDetails", { clientSelected })
          }
        >
          <Icon type="material-community" name="information" color="#474747" />
          <ListItem.Content>
            <ListItem.Title>Datos del cliente</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name="arrow-right-thick"
            color="#474747"
          />
        </ListItem>
      </Modal>
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
