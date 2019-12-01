import * as firebase from "firebase";
import { Action } from "./tv";
import { Dispatch } from "./dispatch";
import config from "../../config";

export const getActionFromMessage = msg => {
  const action = JSON.parse(msg.data.payload) as Action;
  if (!action.type) {
    console.error(action);
    throw "invalid action";
  }
  return action;
};

const dispatchRemote: Dispatch = payload => {
  fetch(process.env.FISH_REMOTE_URL + "/send", {
    method: "post",
    body: JSON.stringify({
      payload
    })
  });
};

const registerRemote = async (): Promise<void> => {
  firebase.initializeApp(config.firebase);

  const sw = navigator.serviceWorker.register("../sw.ts");
  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(
    "BDmK73ruaJ4tAp5C7_58v-GuOBzNA6lPHYXUOrF1TI4LKi9d9MAgQ3r7PPEtG1-6WNTI1Yqm8cB7SErz_PzZdvU"
  );
  await messaging.requestPermission();
  messaging.useServiceWorker(await sw);

  const token = await messaging.getToken();
  await fetch(process.env.FISH_REMOTE_URL + `/register/${token}`, {
    method: "post"
  }).then(r => r.json());

  messaging.onMessage(() => {
    alert("hey! close this tab");
  });

  return;
};

export { registerRemote, dispatchRemote };
