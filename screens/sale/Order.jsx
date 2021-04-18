import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OrderReview from "../../components/sale/OrderReview";

export default function Order({ navigation }) {
  return (
    <View style={styles.viewBody}>
      <OrderReview navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
  },
});
