open Utils;

let component = ReasonReact.statelessComponent("About");

[@react.component]
let make = () => {
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
  </div>;
};
