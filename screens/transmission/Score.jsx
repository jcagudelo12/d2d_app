import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { Button } from "react-native-elements";

moment.locale("es");

export default function Score() {
  const date = moment(new Date()).format("YYYY/MM/DD");
  return (
    <View style={styles.viewDates}>
      <Text style={styles.principalTitle}>Pedidos</Text>
      <View style={styles.datePicker}>
        <Text style={styles.datePickerTitle}>Fecha inicial:</Text>
        <DatePicker
          style={{ width: "95%" }}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={"2021-04-15"}
          maxDate={date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
        />
      </View>
      <View style={styles.datePicker}>
        <Text style={styles.datePickerTitle}>Fecha Final:</Text>
        <DatePicker
          style={{ width: "95%" }}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={"2021-04-15"}
          maxDate={date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          backgroundColor="#fff"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              color: "#fff",
            },
            // ... You can check the source to find the other keys.
          }}
          // onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
      <Button
        title="Cargar Pedidos"
        titleStyle={styles.textButton}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        // onPress={() => doLogin()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewDates: {
    flex: 1,
    // backgroundColor: "#474747",
  },
  datePicker: {
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  datePickerTitle: { marginBottom: 0 },
  principalTitle: {
    fontSize: 30,
    marginTop: 15,
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#CCDB33",
    borderRadius: 20,
  },
  textButton: {
    color: "#000",
    fontWeight: "bold",
  },
});
