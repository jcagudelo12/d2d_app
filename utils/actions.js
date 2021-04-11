import { firebaseApp } from "./firebase";
import firebase from "firebase";
import "firebase/firestore";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let islogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (islogged = true);
  });
  return islogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya ha sido registrado.";
  }
  return result;
};

export const loginWhithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Datos incorrectos.";
  }
  return result;
};

export const closeSesion = () => {
  return firebase.auth().signOut();
};

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);

  try {
    await ref.put(blob);
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL();
    result.statusResponse = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateProfile = async (data) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const reauthenicate = async (password) => {
  const result = { statusResponse: true, error: null };
  const user = getCurrentUser();
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  try {
    await user.reauthenticateWithCredential(credentials);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const updateEmail = async (email) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateEmail(email);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const updatePassword = async (password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updatePassword(password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const addDocumentWithoutId = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await db.collection(collection).add(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }

  return result;
};

export const getClients = async (limitClients, userId) => {
  const result = {
    statusResponse: true,
    error: null,
    clients: [],
    startClient: null,
  };
  try {
    const response = await db.collection("clients").get();
    if (response.docs.length > 0) {
      result.startClient = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const client = doc.data();
      client.id = doc.id;
      result.clients.push(client);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getMoreClients = async (limitClients, startClient) => {
  const result = {
    statusResponse: true,
    error: null,
    client: [],
    startClient: null,
  };
  try {
    const response = await db
      .collection("Clients")
      .orderBy("name", "asc")
      .startAfter(startClient.data())
      .limit(limitClients)
      .get();
    if (response.docs.length > 0) {
      result.startClient = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const client = doc.data();
      client.id = doc.id;
      result.clients.push(client);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
