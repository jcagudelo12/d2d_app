import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

import AddClientForm from "../../components/clients/AddClientForm";

export default function AddClient({ navigation }) {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <AddClientForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
      />
      <Loading isVisible={loading} text="Creando cliente..." />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
