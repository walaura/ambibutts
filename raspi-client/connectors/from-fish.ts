import { Action, Keys, sequences, Dispatcher } from "../../shared/tv";
import { sendKey } from "./to-tv";

const getActionFromMessage = (msg: Notification): Action => {
  const action = JSON.parse(msg.data.payload) as Action;
  if (!action.type) {
    console.error(action);
    throw "invalid action";
  }
  return action;
};

const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(key);
    await sendKey(key);
  }
};

const dispatch: Dispatcher = async action => {
  console.log(action);
  if (action.type === "sequence") {
    play(sequences[action.seq]);
  } else if (action.type === "refresh-sw") {
    registration
      .update()
      .then(status => {
        console.log(status, "yoy");
      })
      .catch(console.error);
  }
};

export const handleNotification = (msg: Notification) => {
  dispatch(getActionFromMessage(msg));
};
