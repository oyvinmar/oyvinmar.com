open Utils;

module Event = {
  let dangerousHtml: string => Js.t('a) = html => {"__html": html};
  [@react.component]
  let make = (~event: FetchData.event) => {
    let name =
      switch (event.serviceName) {
      | Twitter => "Twitter"
      | Swarm => "Swarm"
      | Pinboard => "Pinboard"
      | Github => "Github"
      | Untappd => "Untappd"
      };
    <article className="-ml-3">
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 hover:bg-pink-300 hover:bg-opacity-25 rounded-sm flex items-center space-x-4 p-3">
        <div className="w-14">
          {switch (event.serviceName) {
           | Github =>
             <GithubLogo
               className="fill-current text-black dark:text-gray-100 w-12"
             />
           | Swarm => <SwarmLogo className="w-12" />
           | Pinboard => <PinboardLogo className="w-12" />
           | Untappd => <UntappdLogo className="w-12" />
           | Twitter => <TwitterLogo className="w-12" />
           }}
        </div>
        <div className="">
          <header className="font-bold"> {str(name)} </header>
          <p dangerouslySetInnerHTML={dangerousHtml(event.content)} />
          <time className="text-gray-500"> {str(event.time)} </time>
        </div>
      </a>
      <footer />
    </article>;
  };
};

[@react.component]
let make = (~events: FetchData.events, ~numberOfVisibleEvents: int) => {
  Array.sub(events, 0, numberOfVisibleEvents)
  |> Array.map((event: FetchData.event) => <Event key={event.id} event />)
  |> ReasonReact.array;
};
