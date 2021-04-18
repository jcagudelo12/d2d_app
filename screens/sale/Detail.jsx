import React from "react";
import { StyleSheet, View } from "react-native";
import ListArticles from "../../components/sale/ListArticles";
import "../../utils/global";

export default function Detail() {
  return (
    <View style={styles.viewBody}>
      <ListArticles />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#474747",
  },
});
