[%bs.raw {|require('./styles/base.scss')|}];

[@bs.module] external logo : string = "./logo.svg";

let component = ReasonReact.statelessComponent("App");

let make = (_children) => {
  ...component,
  render: (_self) => <HomePage message="test"> <About /> <Elsewhere /> <Contact /> </HomePage>
};