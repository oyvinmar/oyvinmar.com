type colorMode =
  | Light
  | Dark;

type colorModeToggleAction =
  | Toogle;

type dispatch = colorModeToggleAction => unit;
type contextValue = (colorMode, dispatch);

let initValue: contextValue = (Light, _ => ignore());

let context = React.createContext(initValue);

let useColorMode = () => React.useContext(context);
