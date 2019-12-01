import config from "../config";
import { Dispatcher } from "./tv";

const dispatch: Dispatcher = payload => {
  fetch(config.endpoints.fish + "/send", {
    method: "post",
    body: JSON.stringify({
      payload,
      fish: config.fish.secret
    })
  });
};

export { dispatch };
