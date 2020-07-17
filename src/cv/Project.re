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
  <div className="py-5">
    <div className="flex flex-row content-between">
      <h3 className="mt-0 w-4/5"> {str(name)} </h3>
      <span className="mr-4 text-grey-600"> {str(timeSpan)} </span>
    </div>
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
