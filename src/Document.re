type document;

let document: document = [%bs.raw "document"];

type element;

[@bs.return null_to_opt] [@bs.send]
external getElementById: (document, string) => option(element) = "";

[@bs.set] external setInnerHTML: (element, string) => unit = "innerHTML";