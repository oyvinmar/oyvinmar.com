[@react.component]
let make = (~children, ~href, ~className="") => {
  let url = ReasonReactRouter.useUrl();
  let active =
    switch (url.path) {
    | [first] => "/" ++ first == href ? "active" : ""
    | _ => href == "/" ? "active" : ""
    };
  let classNames = Utils.fromList([className, active]);
  <Link href className=classNames> children </Link>;
};
