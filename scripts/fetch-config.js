require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");

const configAt = __dirname + "/../.config.json";

let existsAlready = false;

const main = async () => {
  if (fs.existsSync(configAt)) {
    console.info("💁‍♀️ you got a config file already!");
    existsAlready = true;
  }
  if (!process.env.CONFIG_URL) {
    if (existsAlready) {
      console.info(
        "💁‍♀️ you dont have CONFIG_URL set up but you already have a config file so it all worked out"
      );
    } else {
      console.error(
        `🤯 Please set CONFIG_URL in your env or manually add a /.config.json file as seen in config.ts`,
        e
      );
      process.exit(1);
    }
    return;
  }
  try {
    const config = await fetch(process.env.CONFIG_URL).then(res => res.json());
    fs.writeFileSync(configAt, JSON.stringify(config, null, "\t"));
    console.log(__dirname + "/../.config.json");
  } catch (e) {
    if (existsAlready) {
      console.error(e);
      console.error(
        `🤯 Unable to fetch config from ${process.env.CONFIG_URL}. Using existing config. is it stale?`
      );
    } else {
      console.error(e);
      console.error(
        `🤯 Unable to fetch config from ${process.env.CONFIG_URL}. Please check the URL or manually add a .config.json file`
      );
      process.exit(1);
    }
  }
};

main();
