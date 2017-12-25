[@bs.module "./app/home/HomePage"] external homePage : ReasonReact.reactClass = "default";

let make = (~message, children) =>
  ReasonReact.wrapJsForReason(~reactClass=homePage, ~props={"message": message}, children);
/* let make = () => ReasonReact.wrapJsForReason(~reactClass=homePage); */