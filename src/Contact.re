open Utils;

module Email = {
  [@react.component]
  let make = (~email: string) => {
    <span>
      <i className="fa fa-envelope" />
      {str(" ")}
      <a href={j|mailto:$email|j}> {str(email)} </a>
    </span>;
  };
};

[@react.component]
let make = () => {
  let (email, setEmail) = React.useState(() => "");
  React.useEffect1(
    () => {
      setEmail(_ => "oyvinmar@gmail.com");
      Some(() => ());
    },
    [||],
  );
  <section className="section" id="contact">
    <div className="container">
      <header className="row section-header">
        <h2> {str("Contact")} </h2>
        <hr />
      </header>
      <div className="row">
        <div className="col-md-12">
          <p>
            {str(
               "You can reach me on all the social networks listed above. Or if you prefer old school email: ",
             )}
            {switch (email) {
             | "" => ReasonReact.null
             | _ => <Email email />
             }}
          </p>
        </div>
      </div>
      <footer className="row">
        <p> {str({j|© 2014 Øyvind Marthinsen |j})} </p>
      </footer>
    </div>
  </section>;
};