type document;

type window;

let document: document = [%bs.raw "document"];

let window: window = [%bs.raw "window"];

[@bs.send] external toggleMode: window => unit = "toggleMode";

type element;

[@bs.send]
external getColorModePreference: window => string = "getColorModePreference";

[@bs.set] external setInnerHTML: (element, string) => unit = "innerHTML";

[@bs.return null_to_opt] [@bs.send]
external documentElement: document => option(element) = "documentElement";

[@bs.send]
external addClass: (document, string) => unit =
  "documentElement.classList.add";

[@bs.send]
external removelass: (document, string) => unit =
  "documentElement.classList.remove";
