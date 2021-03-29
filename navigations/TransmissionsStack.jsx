import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Transmissions from "../screens/tramsmission/Transmissions";

const Stack = createStackNavigator();

export default function TransmissionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="transmissions"
        component={Transmissions}
        options={{
          title: "Enviado",
          headerTitleContainerStyle: {
            backgroundColor: "#5b5b5b",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: "center",
            paddingHorizontal: 10,
            borderTopWidth: 2,
            borderColor: "#CCDB33",
          },
          headerTitleStyle: { color: "#CCDB33" },
        }}
      />
    </Stack.Navigator>
  );
}
