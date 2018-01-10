open Utils;

let component = ReasonReact.statelessComponent("Elsewhere");

[@bs.module] external heroImage320 : string = "./app/img/hero-image_320.jpg";

[@bs.module] external heroImage480 : string = "./app/img/hero-image_480.jpg";

[@bs.module] external heroImage640 : string = "./app/img/hero-image_640.jpg";

[@bs.module] external heroImage800 : string = "./app/img/hero-image_800.jpg";

[@bs.module] external heroImage960 : string = "./app/img/hero-image_960.jpg";

[@bs.module] external heroImage1000 : string = "./app/img/hero-image_1000.jpg";

[@bs.module] external heroImage1120 : string = "./app/img/hero-image_1120.jpg";

[@bs.module] external heroImage1440 : string = "./app/img/hero-image_1440.jpg";

[@bs.module] external heroImage1740 : string = "./app/img/hero-image_1740.jpg";

[@bs.module] external heroImage1920 : string = "./app/img/hero-image_1920.jpg";

let getSrcSets = () => {
  let list = [
    {j|$heroImage320 320w|j},
    {j|$heroImage480 480w|j},
    {j|$heroImage640 640w|j},
    {j|$heroImage800 800w|j},
    {j|$heroImage960 960w|j},
    {j|$heroImage1000 1000w|j},
    {j|$heroImage1120 1120w|j},
    {j|$heroImage1440 1440w|j},
    {j|$heroImage1740 1740w|j},
    {j|$heroImage1920 1920w|j}
  ];
  String.concat(",", list)
};

let make = (_children) => {
  ...component,
  render: (_self) =>
    <section className="hero" id="home">
      <img
        className="hero__img"
        src=heroImage1920
        srcSet=(getSrcSets())
        sizes="(min-width: 150px) 150px, 100vw"
        alt="Beautiful sunset"
      />
      <div className="overlay" />
      <div className="hero__heading text-center">
        <header>
          <h1> (str({js|Hello, I‘m Øyvind|js})) </h1>
          <h2> (str("Welcome to my homepage.")) </h2>
        </header>
      </div>
    </section>
};