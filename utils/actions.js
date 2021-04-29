import { firebaseApp } from "./firebase";
import firebase from "firebase";
import "firebase/firestore";
import moment from "moment";
import { fileToBlob } from "./helpers";

const db = firebase.firestore(firebaseApp);
moment.locale("es");

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
    const response = await db
      .collection("clients")
      .orderBy("name", "asc")
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

export const getMoreClients = async (limitClients, startClient, userId) => {
  const result = {
    statusResponse: true,
    error: null,
    clients: [],
    startClient: null,
  };
  try {
    const response = await db
      .collection("clients")
      .orderBy("name", "asc")
      .startAfter(startClient.data().name)
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

export const getDocumentById = async (collection, id) => {
  const result = { statusResponse: true, error: null, document: null };
  try {
    const response = await db.collection(collection).doc(id).get();
    result.document = response.data();
    result.document.id = response.id;
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getReasonsDoNotBuy = async () => {
  const result = {
    statusResponse: true,
    error: null,
    reasons: [],
  };
  try {
    const response = await db
      .collection("doNotBuy")
      .orderBy("description")
      .get();

    response.forEach((doc) => {
      const reason = doc.data();
      reason.id = doc.id;
      result.reasons.push(reason);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getProducts = async (limitProducts) => {
  const result = {
    statusResponse: true,
    error: null,
    products: [],
    startProduct: null,
  };
  try {
    const response = await db.collection("products").limit(limitProducts).get();
    if (response.docs.length > 0) {
      result.startProduct = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      result.products.push(product);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getMoreProducts = async (limitProducts, startProduct) => {
  const result = {
    statusResponse: true,
    error: null,
    products: [],
    startProduct: null,
  };
  try {
    const response = await db
      .collection("products")
      .orderBy("reference", "asc")
      .startAfter(startProduct.data().reference)
      .limit(limitProducts)
      .get();

    if (response.docs.length > 0) {
      result.startProduct = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      result.products.push(product);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getOrdersSended = async (sellerId) => {
  const initialDay = moment().format("YYYY/MM/DD");

  const result = {
    statusResponse: true,
    error: null,
    orders: [],
  };
  try {
    const response = await db
      .collection("orders")
      .where("createdBy", "==", sellerId)
      .where("createAt", ">=", moment(initialDay).unix())
      .get();

    response.forEach((doc) => {
      const order = doc.data();
      order.id = doc.id;
      result.orders.push(order);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getNotVisitSended = async (sellerId) => {
  const initialDay = moment().format("YYYY/MM/DD");

  const result = {
    statusResponse: true,
    error: null,
    notVisits: [],
  };
  try {
    const response = await db
      .collection("notVisit")
      .where("date", ">=", moment(initialDay).unix())
      .where("createdBy", "==", sellerId)
      .get();

    response.forEach((doc) => {
      const notVisit = doc.data();
      notVisit.id = doc.id;
      result.notVisits.push(notVisit);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
