import { Action, Keys, sequences } from "./tv";
import config from "../../config";

export type Dispatch = (action: Action) => void;

export const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(key);
    await sendKey(key);
  }
};

export const sendKey = async (key: Keys) =>
  fetch(`${config.endpoints.tv}/6/input/key`, {
    method: "post",
    body: JSON.stringify({
      key
    })
  })
    .then(
      () =>
        new Promise(yay => {
          setTimeout(yay, 100);
        })
    )
    .catch(console.error);

export const dispatch: Dispatch = action => {
  console.log(action);
  if (action.type === "sequence") {
    play(sequences[action.seq]);
  }
};
