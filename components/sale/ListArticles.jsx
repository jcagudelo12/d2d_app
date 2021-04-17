import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase/app";
import { Avatar, Button, Rating } from "react-native-elements";
import { size, map } from "lodash";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import "../../utils/global";

export default function ListArticles() {
  const [articles, setArticles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setArticles(global.listArticles);
    }, [articles])
  );
  return (
    <View>
      {!articles && (
        <Text style={styles.mustLoginTest}>
          No se han agregado items al pedido.
        </Text>
      )}
      {size(articles) > 0 &&
        map(articles, (articleDocument) => (
          <Article articleDocument={articleDocument} />
        ))}
    </View>
  );
}

const Article = ({ articleDocument }) => {
  const { reference, description, images, price, quantity } = articleDocument;
  return (
    <View style={styles.viewArticle}>
      <View style={styles.imageAvatar}>
        <Avatar
          renderPlaceholderContent={<ActivityIndicator color="#fff" />}
          size="large"
          rounded
          containerStyle={styles.imageAvatarProduct}
          source={
            images
              ? { uri: images[0] }
              : require("../../assets/avatar-default.jpg")
          }
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.ArticleTitle}>{reference}</Text>
        <Text style={styles.ArticleText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewArticle: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  imageAvatar: {
    marginRight: 15,
  },
  imageAvatarProduct: {
    width: 50,
    height: 50,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  articleTitle: {
    fontWeight: "bold",
  },
  articleText: {
    paddingTop: 2,
    color: "gray",
    marginBottom: 5,
  },
  articleDate: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
