import { getWorkers, addButton, registerWorker } from "./js/helpers";
import { register } from "./connectors/to-fish";

const install = async () => {
  const sw = registerWorker();
  const messaging = await register(await sw);
  messaging.onMessage(() => {
    alert("close this tab!!");
  });
};

const main = async () => {
  const { hasWorkers, workers } = await getWorkers();

  if (!hasWorkers) {
    addButton({
      name: "Install server",
      useOnce: true,
      onclick: async () => {
        await install();
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
        await install();
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
