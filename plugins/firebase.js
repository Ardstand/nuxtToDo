import firebase from "firebase/app";
import "firebase/auth";
import config from "../config/firebaseCon";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();