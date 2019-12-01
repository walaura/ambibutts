import * as firebase from "firebase";
import config from "../../config";

const register = async (
  sw: ServiceWorkerRegistration
): Promise<firebase.messaging.Messaging> => {
  firebase.initializeApp(config.firebase);

  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(
    "BDmK73ruaJ4tAp5C7_58v-GuOBzNA6lPHYXUOrF1TI4LKi9d9MAgQ3r7PPEtG1-6WNTI1Yqm8cB7SErz_PzZdvU"
  );
  await messaging.requestPermission();
  messaging.useServiceWorker(await sw);

  const token = await messaging.getToken();
  await fetch(config.endpoints.fish + `/register/${token}`, {
    method: "post"
  }).then(r => r.json());

  return;
};

export { register };
