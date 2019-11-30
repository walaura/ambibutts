import { config } from "dotenv";
config();
import { sequences } from "./state";
import * as express from "express";
import fetch from "node-fetch";
import { play } from "./tools";

const app = express();
const port = 3000;

app.get("/seq/:command", async (req, res) => {
  const { command } = req.params;
  if (sequences[command]) {
    play(sequences[command], { tvip: process.env.TVIP, fetchFn: fetch });
    res.send("sending " + command);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));