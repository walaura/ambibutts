require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");

const main = async () => {
  try {
    const config = await fetch(process.env.CONFIG_URL).then(res => res.json());
    fs.writeFileSync(
      __dirname + "/../config.json",
      JSON.stringify(config, null, "\t")
    );
    console.log(__dirname + "/../config.json");
  } catch (e) {
    console.error(
      `Please set CONFIG_URL in your env or manually add a config file as seen in config.ts`,
      e
    );
  }
};

main();
