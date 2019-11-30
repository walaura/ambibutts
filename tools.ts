import { Keys } from "./state";

type SendKeyConf = { tvip: unknown; fetchFn: Function };

export const play = async (seq: Keys[], sendKeyConf: SendKeyConf) => {
  for (let key of seq) {
    await sendKey(key, sendKeyConf);
  }
};

export const sendKey = async (key: Keys, { tvip, fetchFn }: SendKeyConf) =>
  fetchFn(`http://${tvip}/6/input/key`, {
    method: "post",
    body: JSON.stringify({
      key
    })
  })
    .then(
      () =>
        new Promise(yay => {
          setTimeout(yay, 500);
        })
    )
    .catch(console.error);
