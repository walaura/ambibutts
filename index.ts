import { dispatchRemote, registerRemote } from "./js/remote";
import { SequenceName, sequences } from "./js/state";

const addButton = ({ onclick, name }) => {
  const $btn = document.createElement("button");
  $btn.innerText = name;
  $btn.onclick = onclick;
  document.body.appendChild($btn);
};

const main = async () => {
  const workers = await navigator.serviceWorker.getRegistrations();
  const hasWorkers = workers.length > 0;

  if (!hasWorkers) {
    addButton({
      name: "register sw",
      onclick: async () => {
        await registerRemote();
        window.location.reload();
      }
    });
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
    addButton({
      name: "unregister sws",
      onclick: async () => {
        await Promise.all(
          workers.map(sw => {
            sw.unregister();
          })
        );
        window.location.reload();
      }
    });
  }
};

main();
