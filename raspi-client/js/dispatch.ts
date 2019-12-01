import { Action, sequences } from "./tv";

export type Dispatch = (action: Action) => void;

type SendKeyConf = { TV_REMOTE_URL: unknown; fetchFn: Function };

export const play = async (seq: Keys[], sendKeyConf: SendKeyConf) => {
  for (let key of seq) {
    await sendKey(key, sendKeyConf);
  }
};

export const sendKey = async (
  key: Keys,
  { TV_REMOTE_URL, fetchFn }: SendKeyConf
) =>
  fetchFn(`${TV_REMOTE_URL}/6/input/key`, {
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
    play(sequences[action.seq], {
      TV_REMOTE_URL: process.env.TV_REMOTE_URL,
      fetchFn: fetch
    });
  }
};
