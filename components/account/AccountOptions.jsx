import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import { Icon, ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions({ user, toastRef, setReloadUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const generateOptions = () => {
    return [
      {
        title: "Cambiar nombres y apellidos",
        iconNameLeft: "account-circle",
        iconColorLeft: "#5b5b5b",
        iconNameRight: "chevron-right",
        iconColorRight: "#5b5b5b",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar email",
        iconNameLeft: "at",
        iconColorLeft: "#5b5b5b",
        iconNameRight: "chevron-right",
        iconColorRight: "#5b5b5b",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar contraseña",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#5b5b5b",
        iconNameRight: "chevron-right",
        iconColorRight: "#5b5b5b",
        onPress: () => selectedComponent("password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
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
      case "password":
        setRenderComponent(
          <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
        );
        break;
    }
    setShowModal(true);
  };
  const menuOptions = generateOptions();

  return (
    <View style={styles.view}>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          style={styles.menuItem}
          underlayColor={"#474747"}
          onPress={menu.onPress}
        >
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
      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // view: {
  //   backgroundColor: "#474747",
  // },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCDB33",
    backgroundColor: "#474747",
  },
});
