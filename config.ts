interface Config {
  endpoints: {
    tv: string; // where your telly listens
    fish: string; // server where u installed fish
  };
  // firebase will give you all this stuff
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

const config = require("./config.json") as Config;
export default config;
