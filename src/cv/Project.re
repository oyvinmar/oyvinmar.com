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
  <div className="py-5 space-y-4">
    <div className="flex items-center">
      <h3 className="mt-0 w-4/5 text-2xl"> {str(name)} </h3>
      <b className="mr-4 block text-grey-600"> {str(timeSpan)} </b>
    </div>
    <p> {str(description)} </p>
    <p>
      <b> {str("Rolle: ")} </b>
      {str(
         {
           role;
         },
       )}
    </p>
    <p> <b> {str("Teknologier: ")} </b> {str(technologies)} </p>
  </div>;
