export const firebaseConfig = {
  apiKey: "AIzaSyC-gWE-Tt4sE2HIQU-nO53i-klKVUScstI",
  authDomain: "push-test-afbe2.firebaseapp.com",
  databaseURL: "https://push-test-afbe2.firebaseio.com",
  projectId: "push-test-afbe2",
  storageBucket: "push-test-afbe2.appspot.com",
  messagingSenderId: "358155627866",
  appId: "1:358155627866:web:8a9c7e756f1c955e04d763"
};

export enum Keys {
  "Standby" = "Standby",
  "Back" = "Back",
  "Find" = "Find",
  "RedColour" = "RedColour",
  "GreenColour" = "GreenColour",
  "YellowColour" = "YellowColour",
  "BlueColour" = "BlueColour",
  "Home" = "Home",
  "VolumeUp" = "VolumeUp",
  "VolumeDown" = "VolumeDown",
  "Mute" = "Mute",
  "Options" = "Options",
  "Dot" = "Dot",
  "Digit0" = "Digit0",
  "Digit1" = "Digit1",
  "Digit2" = "Digit2",
  "Digit3" = "Digit3",
  "Digit4" = "Digit4",
  "Digit5" = "Digit5",
  "Digit6" = "Digit6",
  "Digit7" = "Digit7",
  "Digit8" = "Digit8",
  "Digit9" = "Digit9",
  "Info" = "Info",
  "CursorUp" = "CursorUp",
  "CursorDown" = "CursorDown",
  "CursorLeft" = "CursorLeft",
  "CursorRight" = "CursorRight",
  "Confirm" = "Confirm",
  "Next" = "Next",
  "Previous" = "Previous",
  "Adjust" = "Adjust",
  "WatchTV" = "WatchTV",
  "Viewmode" = "Viewmode",
  "Teletext" = "Teletext",
  "Subtitle" = "Subtitle",
  "ChannelStepUp" = "ChannelStepUp",
  "ChannelStepDown" = "ChannelStepDown",
  "Source" = "Source",
  "AmbilightOnOff" = "AmbilightOnOff",
  "PlayPause" = "PlayPause",
  "Play" = "Play",
  "Pause" = "Pause",
  "FastForward" = "FastForward",
  "Stop" = "Stop",
  "Rewind" = "Rewind",
  "Record" = "Record",
  "Online" = "Online"
}

export const sequences = {
  nextHdmi: [Keys.Source, Keys.CursorRight, Keys.Confirm],
  prevHdmi: [Keys.Source, Keys.CursorLeft, Keys.Confirm]
};

export type SequenceName = keyof typeof sequences;
export type Action = { type: "sequence"; seq: SequenceName };
