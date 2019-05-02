[%bs.raw {|require('./styles/base.scss')|}];

let component = ReasonReact.statelessComponent("App");

let make = (~route, _children) => {
  ...component,
  render: (_self) =>
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
};