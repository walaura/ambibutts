import { dispatch } from "../shared/client-to-fish";
import { SequenceName, sequences } from "../shared/tv";
import { addButton } from "./js/helpers";

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
};

main();
