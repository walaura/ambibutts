import { dispatch } from "../shared/client-to-fish";
import { SequenceName, sequences } from "../shared/tv";
import { addButton } from "./js/helpers";

import { read } from "@walaura/forever-tunnel";

const main = async () => {
  console.log(process.env.FOREVERTUNNEL_BUCKET);
  console.log(read());
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
