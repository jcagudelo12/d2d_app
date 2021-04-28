import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Divider, Icon } from "react-native-elements";
import moment from "moment";
import { addDocumentWithoutId } from "../../utils/actions";
import "../../utils/global";

moment.locale("es");

export default function ListDoNotBuy({ reasons, navigation }) {
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
  const currentDate = moment(new Date()).unix();
  const goReason = async () => {
    const notVisit = {
      id,
      description,
      date: currentDate,
      clientId: global.clientId,
    };

    const responseAddDocument = await addDocumentWithoutId(
      "doNotBuy",
      notVisit
    );
    if (!responseAddDocument.statusResponse) {
      // toastRef.current.show(
      //   "Error al grabar el cliente, por favor intenta más tarde.",
      //   3000
      // );
      return;
    }
  };
  return (
    <TouchableOpacity onPress={goReason}>
      <View style={styles.viewReason}>
        <View style={styles.viewReasonIcon}>
          <Icon
            type="material-community"
            name="cart-off"
            color={"#CCDB33"}
            size={30}
            reverse
            reverseColor={"#000"}
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
    justifyContent: "center",
    width: "100%",
    paddingRight: 4,
  },
  reasonTitle: {
    color: "white",
    fontSize: 20,
    //alignSelf: "center",
  },
  divider: {
    backgroundColor: "#CCDB33",
    margin: 2,
  },
});
