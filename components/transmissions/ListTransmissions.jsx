import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";

export default function ListTransmissions() {
  return (
    <View>
      <Text>ListTransmissions</Text>
      <DatePicker
        style={{ width: 200 }}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
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
          // ... You can check the source to find the other keys.
        }}
        // onDateChange={(date) => {this.setState({date: date})}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
