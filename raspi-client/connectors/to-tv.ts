import config from "../../config";
import { Keys } from "../../shared/tv";

export const sendKey = async (key: Keys) =>
  fetch(`${config.endpoints.tv}/6/input/key`, {
    method: "post",
    body: JSON.stringify({
      key
    })
  })
    .then(
      () =>
        new Promise(yay => {
          setTimeout(yay, 100);
        })
    )
    .catch(console.error);
