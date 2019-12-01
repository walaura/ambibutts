import { SequenceName, Action } from "../shared/tv";
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
  const { sequences } = await fetch(
    urls["ambibutts-server"] + "/what-can-i-do"
  ).then(r => r.json());

  sequences.forEach(seq => {
    addButton({
      name: seq,
      onclick: () =>
        dispatch({
          type: "sequence",
          seq
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
