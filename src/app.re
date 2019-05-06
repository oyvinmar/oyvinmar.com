[%bs.raw {|require('./styles/base.scss')|}];

[@react.component]
let make = (~route) => {
  switch (route) {
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
  };
};