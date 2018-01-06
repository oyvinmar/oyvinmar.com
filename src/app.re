[%bs.raw {|require('./styles/base.scss')|}];

[@bs.module] external logo : string = "./logo.svg";

let component = ReasonReact.statelessComponent("App");

let make = (~route, _children) => {
  ...component,
  render: (_self) => {
    Js.log(route);
    switch route {
    | Routing.Home =>
      <HomePage message="test">
        <Hero />
        <NavigationBar />
        <About />
        <Lifestream />
        <Elsewhere />
        <Contact />
      </HomePage>
    | Routing.Cv => <CvPage />
    }
  }
};