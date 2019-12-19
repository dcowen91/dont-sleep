import firebase from "firebase/app";
require("firebase/functions");

let config = require("../../dist/firebase-config.json");
firebase.initializeApp(config);

firebase.functions();

export default firebase;
