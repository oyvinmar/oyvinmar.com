%raw
"import './styles/base.css'";

module Wrapper = {
  [@react.component]
  let make = (~children) =>
    <div
      className="antialiased leading-tight py-8 lg:py-16 px-6 md:px-16 lg:px-24 max-w-2xl space-y-6">
      <ColorModeToggle />
      <NavigationBar />
      <div className="md:pl-16"> children </div>
    </div>;
};

[@react.component]
let make = () => {
  let url = ReasonReactRouter.useUrl();

  <ColorMode>
    {switch (url.path) {
     | ["cv"] => <CvPage />
     | ["elsewhere"] => <Wrapper> <Elsewhere /> </Wrapper>
     | ["contact"] => <Wrapper> <Contact /> </Wrapper>
     | ["lifestream"] => <Wrapper> <Lifestream /> </Wrapper>
     | _ => <Wrapper> <About /> </Wrapper>
     }}
  </ColorMode>;
};
