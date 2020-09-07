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
  let mode =
    switch (getColorModePreference(window)) {
    | "light" => Light
    | "dark" => Dark
    | _ => Light
    };
  let (state, dispatch) = React.useReducer(reducer, mode);

  <ColorModeProvider value=(state, dispatch)> children </ColorModeProvider>;
};
