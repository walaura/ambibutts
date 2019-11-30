import { Action, sequences } from "./state";

export type Dispatch = (action: Action) => void;

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

export const dispatch: Dispatch = action => {
  console.log(action);
  if (action.type === "sequence") {
    play(sequences[action.seq], { tvip: process.env.TVIP, fetchFn: fetch });
  }
};
