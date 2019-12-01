import config from "../config";
import { handleNotification } from "./connectors/from-fish";

importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: config.firebase.messagingSenderId
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(msg) {
  console.log(msg);
  handleNotification(msg);
});
