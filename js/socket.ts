import { Action } from "./state";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-gWE-Tt4sE2HIQU-nO53i-klKVUScstI",
  authDomain: "push-test-afbe2.firebaseapp.com",
  databaseURL: "https://push-test-afbe2.firebaseio.com",
  projectId: "push-test-afbe2",
  storageBucket: "push-test-afbe2.appspot.com",
  messagingSenderId: "358155627866",
  appId: "1:358155627866:web:8a9c7e756f1c955e04d763"
};

const connect = async (
  dispatch: (action: Action) => void
): Promise<(action: Action) => void> => {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BDmK73ruaJ4tAp5C7_58v-GuOBzNA6lPHYXUOrF1TI4LKi9d9MAgQ3r7PPEtG1-6WNTI1Yqm8cB7SErz_PzZdvU"
  );
  await Notification.requestPermission();
  const token = await messaging.getToken();
  const status = await fetch(
    `https://firebase-push-gateway.glitch.me/register/${token}`,
    {
      method: "post"
    }
  ).then(r => r.json());

  messaging.onMessage(msg => {
    const action = JSON.parse(msg.data.payload) as Action;
    if (!action.type) {
      console.error(action);
      throw "invalid action";
    }
    dispatch(action);
    console.log("Message received. ", action);
  });

  return (payload: Action) => {
    fetch("https://firebase-push-gateway.glitch.me/send", {
      method: "post",
      body: JSON.stringify({ payload })
    });
  };
};

export { connect };
