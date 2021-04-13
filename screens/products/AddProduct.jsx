import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

import AddProductForm from "../../components/products/AddProductForm";

export default function AddProduct({ navigation }) {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <AddProductForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
      />
      <Loading isVisible={loading} text="Creando producto..." />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
