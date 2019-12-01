interface Config {
  endpoints: {
    tv: string /*where your telly listens*/;
    fish: string /*server where u installed fish*/;
  };
  fish: {
    topic: string /*firebase notification channel to subscribe to – just put whatever*/;
    secret: string /*send this to prevent randos from pushing to yr tv*/;
  };

  /*firebase will give you all this stuff*/
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  "firebase-admin": {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
  };
}

const config = require("./.config.json") as Config;
export default config;
