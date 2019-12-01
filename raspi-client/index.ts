import { registerRemote } from "./js/remote";
import { getWorkers, addButton } from "./js/helpers";

const main = async () => {
  const { hasWorkers, workers } = await getWorkers();

  if (!hasWorkers) {
    addButton({
      name: "Install server",
      useOnce: true,
      onclick: async () => {
        await registerRemote();
      }
    });
  } else {
    addButton({
      name: "Reinstall server",
      useOnce: true,
      onclick: async () => {
        await Promise.all(
          workers.map(sw => {
            sw.unregister();
          })
        );
        await registerRemote();
      }
    });
    addButton({
      name: "Uninstall server",
      useOnce: true,
      secondary: true,
      onclick: async () => {
        await Promise.all(
          workers.map(sw => {
            sw.unregister();
          })
        );
      }
    });
  }
};

main();
