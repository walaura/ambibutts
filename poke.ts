import { dispatchRemote, registerRemote } from "./js/remote";
import { SequenceName, sequences } from "./js/config";
import { getWorkers, addButton } from "./js/helpers";

const main = async () => {
  const { hasWorkers } = await getWorkers();

  if (!hasWorkers) {
    Object.keys(sequences).forEach((name: SequenceName) => {
      addButton({
        name,
        onclick: () =>
          dispatchRemote({
            type: "sequence",
            seq: name
          })
      });
    });
  } else {
    window.app.innerText = "You are a server so you cant do fun stuff here";
  }
};

main();
