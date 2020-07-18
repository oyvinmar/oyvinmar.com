open Utils;

type action =
  | Toggle;

type menu =
  | Visible
  | Hidden;

type state = {menu};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action, state) {
        | (Toggle, Visible) => Hidden
        | (Toggle, Hidden) => Visible
        },
      Hidden,
    );

  let classes =
    switch (state) {
    | Visible => "collapse navbar-collapse in"
    | Hidden => "collapse navbar-collapse"
    };

  <nav className="navbar navbar-default" id="nav">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          className="navbar-toggle"
          onClick={_event => dispatch(Toggle)}
          typeof="button">
          <span className="sr-only"> {str("Toggle navigation")} </span>
          <i className="fa fa-bars" />
        </button>
        <a className="navbar-brand" href="/"> {str("oyvinmar.com")} </a>
      </div>
      <div className=classes>
        <ul className="nav navbar-nav">
          <li> <a href="#home"> {str("Home")} </a> </li>
          <li> <a href="#about"> {str("About me")} </a> </li>
          <li> <a href="#lifestream"> {str("Lifestream")} </a> </li>
          <li> <a href="#elsewhere"> {str("Elsewhere")} </a> </li>
          <li> <a href="#contact"> {str("Contact")} </a> </li>
        </ul>
      </div>
    </div>
  </nav>;
};
