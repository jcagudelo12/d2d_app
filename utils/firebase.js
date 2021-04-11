import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv0JUUZFp9ymN4FEeI98lYO7LewPclJpU",
  authDomain: "d2d-app-c7904.firebaseapp.com",
  projectId: "d2d-app-c7904",
  storageBucket: "d2d-app-c7904.appspot.com",
  messagingSenderId: "645111954321",
  appId: "1:645111954321:web:1daa32e525359be92a3830",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
