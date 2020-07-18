[@bs.module "./app/home/HomePage"] [@react.component]
external make: (~message: string, ~children: React.element) => React.element =
  "default";
