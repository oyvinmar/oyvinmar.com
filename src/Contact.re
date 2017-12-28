open Utils;

let component = ReasonReact.statelessComponent("Contact");

type document;

let document: document = [%bs.raw "document"];

type element;

[@bs.return null_to_opt] [@bs.send]
external getElementById : (document, string) => option(element) =
  "";

[@bs.set] external setInnerHTML : (element, string) => unit = "innerHTML";

let make = (_children) => {
  ...component,
  didMount: (_self) => {
    let el = getElementById(document, "email");
    let email = "oyvinmar@gmail.com";
    let mailto = {j|<i class="fa fa-envelope"></i> <a href="mailto:$email">$email</a>|j};
    switch el {
    | Some(el) => setInnerHTML(el, mailto)
    | None => ()
    };
    ReasonReact.NoUpdate
  },
  render: (_self) =>
    <section className="section" id="contact">
      <div className="container">
        <header className="row section-header"> <h2> (str("Contact")) </h2> <hr /> </header>
        <div className="row">
          <div className="col-md-12">
            <p>
              (
                str(
                  "You can reach me on all the social networks listed above. Or if you prefer old school email: "
                )
              )
              <span id="email" />
            </p>
          </div>
        </div>
        <footer className="row"> <p> (str({j|© 2014 Øyvind Marthinsen |j})) </p> </footer>
      </div>
    </section>
};