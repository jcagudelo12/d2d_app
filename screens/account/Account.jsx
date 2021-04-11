import React, { useState, useCallback } from "react";
import Loading from "../../components/Loading";
import { getCurrentUser } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";

import UserLogged from "./UserLogged";
import UserGuest from "./UserGuest";

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
  return login ? <UserLogged /> : <UserGuest />;
}
