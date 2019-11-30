import { firebaseConfig } from "./js/config";
import { dispatch } from "./js/dispatch";
import { getActionFromMessage } from "./js/remote";

importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");

firebase.initializeApp({ messagingSenderId: firebaseConfig.messagingSenderId });
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(msg) {
  console.log(msg);
  dispatch(getActionFromMessage(msg));
});
