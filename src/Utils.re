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
