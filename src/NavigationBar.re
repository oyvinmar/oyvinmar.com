open Utils;

type action =
  | Toggle;

type menu =
  | Visible
  | Hidden;

type state = {menu};

let component = ReasonReact.reducerComponent("NavigationBar");

let make = (_children) => {
  ...component,
  initialState: () => {menu: Hidden},
  reducer: (action, state) =>
    switch (action, state.menu) {
    | (Toggle, Visible) => ReasonReact.Update({menu: Hidden})
    | (Toggle, Hidden) => ReasonReact.Update({menu: Visible})
    },
  render: (self) => {
    let classes =
      switch self.state.menu {
      | Visible => "collapse navbar-collapse in"
      | Hidden => "collapse navbar-collapse"
      };
    <nav className="navbar navbar-default" id="nav">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            className="navbar-toggle" onClick=(_event => self.send(Toggle)) typeof="button">
            <span className="sr-only"> (str("Toggle navigation")) </span>
            <i className="fa fa-bars" />
          </button>
          <a className="navbar-brand" href="/"> (str("oyvinmar.com")) </a>
        </div>
        <div className=classes>
          <ul className="nav navbar-nav">
            <li> <a href="#home"> (str("Home")) </a> </li>
            <li> <a href="#about"> (str("About me")) </a> </li>
            <li> <a href="#lifestream"> (str("Lifestream")) </a> </li>
            <li> <a href="#elsewhere"> (str("Elsewhere")) </a> </li>
            <li> <a href="#contact"> (str("Contact")) </a> </li>
          </ul>
        </div>
      </div>
    </nav>
  }
};