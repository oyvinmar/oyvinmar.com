open Window;
open ColorModeContext;

type state = {colorMode};

let reducer = (state, action) =>
  switch (state, action) {
  | (Light, Toogle) =>
    toggleColorMode(window);
    Dark;

  | (Dark, Toogle) =>
    toggleColorMode(window);
    Light;
  };

[@react.component]
let make = (~children) => {
  Js.log(getColorModePreference(window));
  let mode =
    switch (getColorModePreference(window)) {
    | "light" => Light
    | "dark" => Dark
    | _ => Light
    };
  let (state, dispatch) = React.useReducer(reducer, mode);
  // let context = React.useMemo2(() => (state, dispatch), (state, dispatch));

  <ColorModeProvider value=(state, dispatch)> children </ColorModeProvider>;
};
