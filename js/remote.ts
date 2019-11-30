import * as firebase from "firebase";
import { firebaseConfig } from "./config";
import { Action } from "./state";
import { Dispatch } from "./dispatch";

export const getActionFromMessage = msg => {
  const action = JSON.parse(msg.data.payload) as Action;
  if (!action.type) {
    console.error(action);
    throw "invalid action";
  }
  return action;
};

const dispatchRemote: Dispatch = payload => {
  fetch("https://firebase-push-gateway.glitch.me/send", {
    method: "post",
    body: JSON.stringify({ payload, fish: process.env.FISH_KEY })
  });
};

const registerRemote = async (): Promise<void> => {
  firebase.initializeApp(firebaseConfig);

  const sw = navigator.serviceWorker.register("../sw.ts");
  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(
    "BDmK73ruaJ4tAp5C7_58v-GuOBzNA6lPHYXUOrF1TI4LKi9d9MAgQ3r7PPEtG1-6WNTI1Yqm8cB7SErz_PzZdvU"
  );
  await messaging.requestPermission();
  messaging.useServiceWorker(await sw);

  const token = await messaging.getToken();
  await fetch(`https://firebase-push-gateway.glitch.me/register/${token}`, {
    method: "post"
  }).then(r => r.json());

  messaging.onMessage(() => {
    alert("hey! close this tab");
  });

  return;
};

export { registerRemote, dispatchRemote };
