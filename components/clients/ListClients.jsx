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

import Modal from "../Modal";
import ChangeEmailForm from "../account/ChangeEmailForm";
import ChangePasswordForm from "../account/ChangePasswordForm";
import ListProducts from "../sale/ListProducts";

export default function ListClients({ clients, navigation, handleLoadMore }) {
  const [showModal, setShowModal] = useState(false);

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
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      />
    </View>
  );
}

const Client = ({ client, navigation, showModal, setShowModal }) => {
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

  const generateOptions = () => {
    return [
      {
        title: "Venta",
        iconNameLeft: "cart-arrow-down",
        iconColorLeft: "#474747",
        iconNameRight: "arrow-right-thick",
        iconColorRight: "#474747",
        onPress: () => selectedComponent("sale"),
      },
      {
        title: "Cartera y Recaudo",
        iconNameLeft: "cash-multiple",
        iconColorLeft: "#474747",
        iconNameRight: "arrow-right-thick",
        iconColorRight: "#474747",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "No Compra",
        iconNameLeft: "cart-off",
        iconColorLeft: "#474747",
        iconNameRight: "arrow-right-thick",
        iconColorRight: "#474747",
        onPress: () => selectedComponent("doNotBuy"),
      },
      {
        title: "Datos del cliente",
        iconNameLeft: "information",
        iconColorLeft: "#474747",
        iconNameRight: "arrow-right-thick",
        iconColorRight: "#474747",
        onPress: () => selectedComponent("clientDetails"),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "sale":
        {
          setShowModal(false);
          navigation.navigate("sale", { id, name });
        }
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            displayName={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case "clientDetails":
        navigation.navigate("clientDetails", { id, name });
        break;
      case "doNotBuy":
        navigation.navigate("doNotBuy", { id });
        break;
    }
    setShowModal(true);
  };
  const menuOptions = generateOptions();

  const goOptionsClient = () => {
    setShowModal(true);
    //navigation.navigate("client", { id, name });
  };
  return (
    <TouchableOpacity onPress={goOptionsClient}>
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
        {map(menuOptions, (menu, index) => (
          <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
            <Icon
              type="material-community"
              name={menu.iconNameLeft}
              color={menu.iconColorLeft}
            />
            <ListItem.Content>
              <ListItem.Title>{menu.title}</ListItem.Title>
            </ListItem.Content>
            <Icon
              type="material-community"
              name={menu.iconNameRight}
              color={menu.iconColorRight}
            />
          </ListItem>
        ))}
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
