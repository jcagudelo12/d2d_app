import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUMW5EUdcszP5Y02V28iJdUApjVIOF5GI",
  authDomain: "d2d-app-e57b7.firebaseapp.com",
  projectId: "d2d-app-e57b7",
  storageBucket: "d2d-app-e57b7.appspot.com",
  messagingSenderId: "693826308000",
  appId: "1:693826308000:web:0bb0efa5125ce6d82b46c5",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
