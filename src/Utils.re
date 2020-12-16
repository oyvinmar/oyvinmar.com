let str = str => ReasonReact.string(str);

let append = (x1, x2) =>
  switch (x1, x2) {
  | ("", x)
  | (x, "") => x
  | (x1, x2) => x1 ++ " " ++ x2
  };

let fromList = {
  let rec aux = acc =>
    fun
    | [] => acc
    | ["", ...rest] => aux(acc, rest)
    | [cn, ...rest] => aux(acc ++ " " ++ cn, rest);
  aux("");
};

let toHumanReadableString = date => {
  let time = Js.Date.getTime(date);
  let now = Js.Date.now();
  let diffInSeconds = (now -. time) /. 1000.0;
  let diffInMinutes = diffInSeconds /. 60.0;
  let diffInHours = diffInMinutes /. 60.0;
  let diffInDays = diffInHours /. 24.0;

  if (diffInSeconds < 60.0) {
    "now";
  } else if (diffInMinutes < 60.0) {
    Js.Float.toFixed(diffInMinutes) ++ " min ago";
  } else if (diffInHours < 24.0) {
    Js.Float.toFixed(diffInHours) ++ "h ago";
  } else if (diffInDays < 1.5) {
    "yesterday";
  } else if (diffInDays < 30.0) {
    Js.Float.toFixed(diffInDays) ++ " days ago";
  } else {
    let toLocaleString = [%raw
      {|
  function(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  }
|}
    ];
    toLocaleString(date);
  };
};
