open Utils;

let component = ReasonReact.statelessComponent("About");

[@bs.module]
external oyvindM150: string = "./app/img/Oyvind-Marthinsen_150.jpg";

[@bs.module]
external oyvindM300: string = "./app/img/Oyvind-Marthinsen_300.jpg";

[@bs.module] external profileImage: string = "./app/img/profile.png";

let getSrcSets = () => {
  let list = [oyvindM300 ++ " 300w", oyvindM150 ++ " 150w"];
  String.concat(",", list);
};

[@react.component]
let make = () => {
  <div>
    <div className="space-y-5">
      <h1> {str("Who am I?")} </h1>
      <p>
        {str(
           {js|I’m Øyvind Marthinsen, a (frontend) developer, nerd, and father living in |js},
         )}
        <a
          className="text-link"
          href="https://en.wikipedia.org/wiki/Oslo"
          rel="external">
          {str("Oslo, Norway")}
        </a>
        {str(".")}
      </p>
      <p>
        {str("Currently, I'm working as a consultant at ")}
        <a className="text-link" href="http://knowit.no" rel="external">
          {str("Knowit")}
        </a>
        {str(", where I'm able to work on ")}
        <a
          className="text-link"
          href="https://developer.entur.org"
          rel="external">
          {str("cool")}
        </a>
        {str(" ")}
        <a className="text-link" href="https://ndla.no" rel="external">
          {str("things")}
        </a>
        {str(".")}
      </p>
      <p>
        {str(
           "While I'm mainly being a consumer of open source. I have been lucky to work on some open source projects and contributing back when time and work allow me too.",
         )}
      </p>
      <p>
        {str(
           "In my spear time I enjoy watching football (the British kind), and love cyckling in the summer and going skiing in the winter.",
         )}
      </p>
    </div>
  </div>;
};
