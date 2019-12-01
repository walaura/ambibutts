import fetch from "node-fetch";
import config from "../../shared/config";
import { Dispatcher, Keys, sequences } from "../../shared/tv";

const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(key);
    await sendKey(key);
  }
};

const sendKey = async (key: Keys) =>
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

const dispatch: Dispatcher = async action => {
  console.log(action);
  if (action.type === "sequence") {
    play(sequences[action.seq]);
  } else {
    console.error(action);
    throw "Action not found";
  }
};

export { dispatch };
