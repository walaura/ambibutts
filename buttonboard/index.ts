import { SequenceName, sequences, Action } from "../shared/tv";
import { addButton } from "./js/helpers";

const urls = require("../.tunnels.json");

const dispatch = (action: Action) => {
  return fetch(urls["ambibutts-server"] + "/action", {
    method: "post",
    body: JSON.stringify({
      action
    })
  });
};

const main = async () => {
  Object.keys(sequences).forEach((name: SequenceName) => {
    addButton({
      name,
      onclick: () =>
        dispatch({
          type: "sequence",
          seq: name
        })
    });
  });
  addButton({
    name: "refresh sw",
    onclick: () =>
      dispatch({
        type: "refresh-sw"
      })
  });
};

main();
