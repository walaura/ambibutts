import { Action } from "./state";

const connect = (
  dispatch: (action: Action) => void
): Promise<(action: Action) => void> => {
  const socket = new WebSocket(
    `wss://connect.websocket.in/v2/${process.env.SOCKET_CHANNEL}?token=${process.env.SOCKET_KEY}`
  );
  socket.onmessage = event => {
    try {
      const action = JSON.parse(event.data) as Action;
      if (action.type) {
        console.log("received action");
        dispatch(action);
      } else {
        throw "invalid action";
      }
    } catch (e) {
      console.error(e);
    }
  };
  socket.onerror = err => {
    throw err;
  };
  return new Promise(yay => {
    socket.onopen = () => {
      const remoteDispatch = (action: Action) => {
        socket.send(JSON.stringify(action));
      };
      yay(remoteDispatch);
    };
  });
};

export { connect };
