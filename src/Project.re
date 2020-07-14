open Utils;

[@react.component]
let make =
    (
      ~name: string,
      ~timeSpan: string,
      ~description: string,
      ~role: string,
      ~technologies: string,
    ) =>
  <div className="project">
    <h4>
      <span className="pull-right"> {str(timeSpan)} </span>
      {str(name)}
    </h4>
    <p> {str(description)} </p>
    <div className="role">
      <p>
        <b> {str("Rolle: ")} </b>
        {str(
           {
             role;
           },
         )}
      </p>
      <p> <b> {str("Teknologier: ")} </b> {str(technologies)} </p>
    </div>
  </div>;
