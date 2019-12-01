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

const repeat = (key: Keys, length: number) =>
  Array.apply(null, { length }).map(() => key);
const sourceMenu = [Keys.Source, ...repeat(Keys.CursorDown, 3)];
const resetSource = [Keys.Source, ...repeat(Keys.CursorLeft, 10)];
const toSourceNumber = (number = 0) => [
  ...resetSource,
  ...repeat(Keys.CursorRight, number),
  Keys.Confirm
];

export const sequences = {
  nextHdmi: [...sourceMenu, Keys.CursorRight, Keys.Confirm],
  prevHdmi: [...sourceMenu, Keys.CursorLeft, Keys.Confirm],
  xbox: toSourceNumber(3),
  switch: toSourceNumber(4)
};

export type SequenceName = keyof typeof sequences;
export type Action = { type: "sequence"; seq: SequenceName };
export type Dispatcher = (action: Action) => void;
