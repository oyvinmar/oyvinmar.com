open Utils;

let component = ReasonReact.statelessComponent("About");

[@bs.module] external oyvindM150 : string = "./app/img/Oyvind-Marthinsen_150.jpg";

[@bs.module] external oyvindM300 : string = "./app/img/Oyvind-Marthinsen_300.jpg";

let getSrcSets = () => {
  let list = [oyvindM300 ++ " 300w", oyvindM150 ++ " 150w"];
  String.concat(",", list)
};

let make = (_children) => {
  ...component,
  render: (_self) =>
    <div className="section" id="about">
      <section className="container">
        <header className="row section-header"> <h2> (str("About me")) </h2> <hr /> </header>
        <section className="row">
          <div className="col-md-12">
            <img
              alt="Picture of �\152yvind Marthinsen"
              id="headshot"
              src="/assets/img/Oyvind-Marthinsen_300.jpg"
              srcSet=(getSrcSets())
              sizes="100vw"
            />
          </div>
        </section>
        <section className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <p>
              (
                str(
                  "I'm a Norwegian developer and web enthusiast living in Oslo. Currently I'm working as a consultant at "
                )
              )
              <a href="http://knowit.no" rel="external"> (str("Knowit")) </a>
              (
                str(
                  ", where I'm able to work on cool things. In my spear time I enjoy watching football (the British kind), and love going skiing in the winter."
                )
              )
            </p>
          </div>
        </section>
      </section>
    </div>
};