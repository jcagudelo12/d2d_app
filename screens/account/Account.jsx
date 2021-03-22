import React, { useState, useCallback } from "react";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";

import UserGuest from "./UserGuest";
import LoginForm from "../../components/account/LoginForm";

export default function Account() {
  const [login, setLogin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser();
      user ? setLogin(true) : setLogin(false);
    }, [])
  );

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return login ? <UserLogged /> : <LoginForm />;
}
