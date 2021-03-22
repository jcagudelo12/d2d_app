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
        options={{ title: "Transmisiones" }}
      />
    </Stack.Navigator>
  );
}
