[%bs.raw {|require('./styles/base.css')|}];

[@react.component]
let make = (~route) => {
  switch (route) {
  | Routing.About =>
    <div
      className="text-gray-700 antialiased leading-tight py-8 lg:py-16 px-6 md:px-16 lg:px-24 max-w-2xl space-y-6">
      <NavigationBar />
      <About />
    </div>
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
