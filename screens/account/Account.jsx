import React, { useState, useCallback } from "react";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";

import UserLogged from "./UserLogged";
import Login from "./Login";

export default function Account() {
  const [login, setLogin] = useState(false);

  useFocusEffect(
    useCallback(() => {
      firebase.auth().onAuthStateChanged((user) => {
        user ? setLogin(true) : setLogin(false);
      });
    }, [])
  );

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UserLogged /> : <Login />;
}
