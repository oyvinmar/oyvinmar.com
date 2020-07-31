[%bs.raw {|require('./styles/base.css')|}];

module Wrapper = {
  [@react.component]
  let make = (~children) =>
    <div
      className="text-gray-700 antialiased leading-tight py-8 lg:py-16 px-6 md:px-16 lg:px-24 max-w-2xl space-y-6">
      <NavigationBar />
      <div className="md:pl-16"> children </div>
    </div>;
};

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  let route =
    switch (url.path) {
    | ["cv"] => Routing.Cv
    | ["about"] => Routing.About
    | ["elsewhere"] => Routing.Elsewhere
    | ["contact"] => Routing.Contact
    | ["lifestream"] => Routing.Lifestream
    | [] => Routing.About
    | _ => Routing.About
    };

  switch (route) {
  | Routing.About => <Wrapper> <About /> </Wrapper>
  | Routing.Elsewhere => <Wrapper> <Elsewhere /> </Wrapper>
  | Routing.Contact => <Wrapper> <Contact /> </Wrapper>
  | Routing.Lifestream => <Wrapper> <Lifestream /> </Wrapper>
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
