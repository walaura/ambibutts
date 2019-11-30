import { connect } from "./socket";
import { sequences, SequenceName, Keys } from "./state";
import { sendKey } from "./tools";

const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(key);
    await sendKey(key, { tvip: process.env.TVIP, fetchFn: fetch });
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
