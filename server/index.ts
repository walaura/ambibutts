import { sequences } from "./../shared/tv";
import { getActionFromRequest } from "./transform/from-request";
import { dispatch } from "./transform/to-tv";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const app = express();
app.use(cors() as any);
app.use(bodyParser.json({ type: "*/*" }));

app.get("/", (req, res) => {
  res.send({ ok: "ok" });
});

app.get("/what-can-i-do", (req, res) => {
  res.send({ sequences: Object.keys(sequences) });
});

app.post("/action", async (req, res) => {
  const action = getActionFromRequest(req);
  try {
    await dispatch(action);
    res.send({ msg: "ok", action });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  const address = listener.address();
  console.log(
    "Your app is listening on port " +
      (typeof address === "string" ? address : address.port)
  );
});
