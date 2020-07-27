[@react.component]
let make = (~children, ~href, ~className="") => {
  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event);
    ReasonReactRouter.push(href);
  };
  <a href className onClick> children </a>;
};
