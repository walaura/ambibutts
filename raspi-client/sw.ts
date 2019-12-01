import { dispatch } from "./js/dispatch";
import { getActionFromMessage } from "./js/remote";
import config from "../config";

importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: config.firebase.messagingSenderId
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(msg) {
  console.log(msg);
  dispatch(getActionFromMessage(msg));
});
