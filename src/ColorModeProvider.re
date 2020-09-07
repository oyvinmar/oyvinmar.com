let make = React.Context.provider(ColorModeContext.context);

let makeProps = (~value, ~children, ()) => {
  "value": value,
  "children": children,
};
