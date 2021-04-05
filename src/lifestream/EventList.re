open Utils;

module Collapse = {
  [@bs.module "@oyvinmar-forks/react-collapse"] [@react.component]
  external make:
    (~isOpened: bool, ~children: ReasonReact.reactElement) => React.element =
    "Collapse";
};

module SimpleEvent = {
  let dangerousHtml: string => Js.t('a) = html => {"__html": html};
  [@react.component]
  let make = (~event: FetchData.event) => {
    <article className="ml-16">
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 hover:bg-pink-300 hover:bg-opacity-25 rounded-sm flex items-center space-x-4 p-3">
        <div>
          <p dangerouslySetInnerHTML={dangerousHtml(event.content)} />
          <time className="text-gray-500 font-normal">
            {str(Utils.toHumanReadableString(event.date))}
          </time>
        </div>
      </a>
    </article>;
  };
};

type state = {displayAll: bool};

module EventGroup = {
  let dangerousHtml: string => Js.t('a) = html => {"__html": html};
  [@react.component]
  let make = (~event: FetchData.event) => {
    let (displayAll, setDisplayAll) = React.useState(_ => false);
    let name =
      switch (event.serviceName) {
      | Twitter => "Twitter"
      | Strava => "Strava"
      | Swarm => "Swarm"
      | Pinboard => "Pinboard"
      | Github => "Github"
      | Untappd => "Untappd"
      };

    let pathClassNames =
      Utils.fromList(["path", "path-" ++ String.lowercase_ascii(name)]);
    <article className="-ml-3">
      <div className="mt-5 flex items-center space-x-4 p-3 relative">
        <div>
          {switch (event.serviceName) {
           | Github =>
             <GithubLogo
               className="fill-current text-black dark:text-gray-100 w-12"
             />
           | Swarm => <SwarmLogo className="w-12" />
           | Pinboard => <PinboardLogo className="w-12" />
           | Untappd => <UntappdLogo className="w-12" />
           | Twitter => <TwitterLogo className="w-12" />
           | Strava => <StravaLogo className="w-12 h-12" />
           }}
        </div>
        <div>
          <header className="font-bold">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link">
              {str(name)}
            </a>
          </header>
          <p dangerouslySetInnerHTML={dangerousHtml(event.content)} />
          <time className="text-gray-500">
            {str(Utils.toHumanReadableString(event.date))}
          </time>
        </div>
      </div>
      <div className="ml-16 px-3 -mt-2">
        {Array.length(event.group) > 0 && displayAll === false
           ? <div className="inline-block ">
               <button
                 className="link-btn" onClick={_ => setDisplayAll(_ => true)}>
                 {str(
                    string_of_int(Array.length(event.group))
                    ++ " similiar items",
                  )}
               </button>
             </div>
           : React.null}
      </div>
      <Collapse isOpened=displayAll>
        <div className="relative">
          <span className=pathClassNames ariaHidden=true />
          {Array.map(
             (event: FetchData.event) => <SimpleEvent key={event.id} event />,
             event.group,
           )
           |> ReasonReact.array}
        </div>
      </Collapse>
    </article>;
  };
};

[@react.component]
let make = (~events: FetchData.events) => {
  events
  |> Array.map((event: FetchData.event) =>
       <EventGroup key={event.id} event />
     )
  |> ReasonReact.array;
};
