/* Copied from Route module in reason-react */
[@bs.get] external location: Dom.window => Dom.location;
[@bs.get] external pathname: Dom.location => string;
[@bs.get] external hash: Dom.location => string;
[@bs.get] external search: Dom.location => string;
/* if we ever roll our own parser in the future, make sure you test all url combinations
   e.g. foo.com/?#bar
   */
/* sigh URLSearchParams doesn't work on IE11, edge16, etc. */
/* actually you know what, not gonna provide search for now. It's a mess.
   We'll let users roll their own solution/data structure for now */
let path = () =>
  switch ([%external window]) {
  | None => []
  | Some((window: Dom.window)) =>
    switch (window |> location |> pathname) {
    | ""
    | "/" => []
    | raw =>
      /* remove the preceeding /, which every pathname seems to have */
      let raw = Js.String.sliceToEnd(~from=1, raw);
      /* remove the trailing /, which some pathnames might have. Ugh */
      let raw =
        switch (Js.String.get(raw, Js.String.length(raw) - 1)) {
        | "/" => Js.String.slice(~from=0, ~to_=-1, raw)
        | _ => raw
        };
      raw |> Js.String.split("/") |> Array.to_list;
    }
  };
let hash = () =>
  switch ([%external window]) {
  | None => ""
  | Some((window: Dom.window)) =>
    switch (window |> location |> hash) {
    | ""
    | "#" => ""
    | raw =>
      /* remove the preceeding #, which every hash seems to have.
         Why is this even included in location.hash?? */
      raw |> Js.String.sliceToEnd(~from=1)
    }
  };
let search = () =>
  switch ([%external window]) {
  | None => ""
  | Some((window: Dom.window)) =>
    switch (window |> location |> search) {
    | ""
    | "?" => ""
    | raw =>
      /* remove the preceeding ?, which every hash seems to have. */
      raw |> Js.String.sliceToEnd(~from=1)
    }
  };
