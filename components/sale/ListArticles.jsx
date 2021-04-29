import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase/app";
import { Image, Icon, Button } from "react-native-elements";
import { size, map } from "lodash";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import "../../utils/global";

export default function ListArticles() {
  const [articles, setArticles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setArticles(global.listArticles);
      }
      getData();
    }, [articles])
  );
  return (
    <View style={styles.principalView}>
      {size(articles) > 0 ? (
        map(articles, (articleDocument) => (
          <Article
            articleDocument={articleDocument}
            key={articleDocument.reference}
          />
        ))
      ) : (
        <>
          <Icon
            type="material-community"
            name="emoticon-sad-outline"
            size={100}
            color={"#fff"}
          />
          <Text style={styles.mustLoadArticles}>
            Oops!! aún no has agregado ningún articulo.
          </Text>
        </>
      )}
    </View>
  );
}

// const deleteArticle = () => {
//     let index = global.listArticles.indexOf(3);
//   global.listArticles.splice(index, 1);
// };
const Article = ({ articleDocument }) => {
  const { reference, description, images, price, quantity } = articleDocument;
  return (
    <View style={styles.viewArticle}>
      <View style={styles.imageAvatar}>
        <Image
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator color="#ffffff" />}
          source={{ uri: images[0] }}
          style={styles.imageProduct}
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.articleText}>
          <Text style={styles.articleTitle}>Referencia: </Text>
          {reference}
        </Text>
        <Text style={styles.articleText}>
          <Text style={styles.articleTitle}>Descripción: </Text>
          {description}
        </Text>
        <Text style={styles.articleText}>
          <Text style={styles.articleTitle}>Cantidad: </Text>
          {quantity}
        </Text>
        <Text style={styles.articleText}>
          <Text style={styles.articleTitle}>Valor unitario: </Text>
          {price}
        </Text>
        <Text style={styles.articleText}>
          <Text style={styles.articleTitle}>Total: </Text>
          {quantity * price}
        </Text>
      </View>
      <View style={styles.buttonsView}>
        <Button
          buttonStyle={styles.btnEditArticle}
          titleStyle={styles.btnTitleEditArticle}
          onPress={() => console.log("Boton editar")}
          icon={{
            type: "material-community",
            name: "pencil",
            color: "#000",
          }}
        />
        <Button
          buttonStyle={styles.btnDeleteArticle}
          titleStyle={styles.btnTitleDeleteArticle}
          onPress={() => console.log("Boton eliminar")}
          icon={{
            type: "material-community",
            name: "delete",
            color: "#fff",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewArticle: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#CCDB33",
    borderBottomWidth: 1,
  },
  imageAvatar: {
    marginRight: 15,
  },
  imageAvatarProduct: {
    width: 40,
    height: 40,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  articleTitle: {
    fontWeight: "bold",
    color: "white",
  },
  articleText: {
    color: "white",
    paddingTop: 2,
    marginBottom: 5,
  },
  mustLoadArticles: {
    fontSize: 30,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    color: "#fff",
  },
  imageProduct: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  btnDeleteArticle: {
    backgroundColor: "red",
    textAlignVertical: "center",
  },
  btnTitleDeleteArticle: {
    color: "#000",
  },
  btnEditArticle: {
    backgroundColor: "#CCDB33",
    textAlignVertical: "center",
  },
  btnTitleEditArticle: {
    color: "#000",
  },
  buttonsView: {
    justifyContent: "space-around",
  },
});
