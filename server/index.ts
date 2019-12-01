import { getActionFromRequest } from "./transform/from-request";
import { dispatch } from "./transform/to-tv";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

app.get("/", (req, res) => {
  res.send({ ok: "ok" });
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
  console.log("Your app is listening on port " + listener.address().port);
});
