import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Divider, Icon } from "react-native-elements";

export default function ListDoNotBuy({ reasons, navigation }) {
  //   const { clientSelected } = route.params;
  const [reasonSelected, setReasonSelected] = useState();
  return (
    <View>
      <FlatList
        data={reasons}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        renderItem={(reason) => (
          <Reason
            reason={reason}
            navigation={navigation}
            reasonSelected={reasonSelected}
            setReasonSelected={setReasonSelected}
          />
        )}
      />
    </View>
  );
}

const Reason = ({ reason, navigation, reasonSelected, setReasonSelected }) => {
  const { id, description } = reason.item;
  const goReason = () => {
    //navigation.navigate("restaurant", { id, name });
  };

  return (
    <TouchableOpacity onPress={goReason}>
      <View style={styles.viewReason}>
        <View style={styles.viewReasonIcon}>
          <Icon
            type="material-community"
            name="cart-off"
            color="white"
            size={50}
          />
        </View>
        <View style={styles.viewReasonInformation}>
          <Text style={styles.reasonTitle}>{description}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewReason: {
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  viewReasonIcon: {
    marginRight: 15,
  },
  viewReasonInformation: {
    width: "100%",
    paddingRight: 4,
  },
  reasonTitle: {
    textAlignVertical: "center",
    color: "white",
    fontSize: 20,
  },
  divider: {
    backgroundColor: "#CCDB33",
    margin: 2,
  },
});