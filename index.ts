import { connect } from "./socket";
import { sequences, SequenceName, Keys } from "./state";

const sendKey = async (key: Keys) =>
  fetch(`http://${process.env.TVIP}/6/input/key`, {
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

const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(key);
    await sendKey(key);
  }
};

const main = async () => {
  const dispatch = await connect(action => {
    console.log(action);
    if (action.type === "sequence") {
      play(sequences[action.seq]);
    }
  });
  Object.keys(sequences).forEach((name: SequenceName) => {
    const $btn = document.createElement("button");
    $btn.innerText = name;
    $btn.onclick = () =>
      dispatch({
        type: "sequence",
        seq: name
      });
    document.body.appendChild($btn);
  });
};

main();
