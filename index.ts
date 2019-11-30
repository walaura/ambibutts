enum Keys {
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

const sendKey = async (key: Keys) =>
  fetch(`http://${process.env.TVIP}/6/input/key`, {
    method: "post",
    body: JSON.stringify({
      key
    })
  })
    .then(
      () =>
        new Promise(yay => {
          setTimeout(yay, 500);
        })
    )
    .catch(console.error);

const nextHdmi = [Keys.Source, Keys.CursorRight, Keys.Confirm];
const prevHdmi = [Keys.Source, Keys.CursorLeft, Keys.Confirm];

const sequences: { name: string; seq: Keys[] }[] = [
  { name: "next-hdmi", seq: nextHdmi },
  { name: "prev-hdmi", seq: prevHdmi }
];

const play = async (seq: Keys[]) => {
  for (let key of seq) {
    console.log(1212);
    await sendKey(key);
  }
};

sequences.forEach(({ name, seq }) => {
  const $btn = document.createElement("button");
  $btn.innerText = name;
  $btn.onclick = () => play(seq);
  document.body.appendChild($btn);
});
