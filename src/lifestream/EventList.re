open Utils;

module Event = {
  let dangerousHtml: string => Js.t('a) = html => {"__html": html};
  [@react.component]
  let make = (~event: FetchData.event) =>
    <article className="-ml-3">
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 hover:bg-pink-300 hover:bg-opacity-25 rounded-sm flex items-center space-x-4 p-3">
        <div className="w-12">
          <img src={event.logo} className="" alt="logo" />
        </div>
        <div className="">
          <header className="font-bold"> {str(event.serviceName)} </header>
          <p dangerouslySetInnerHTML={dangerousHtml(event.content)} />
          <time className="text-gray-500"> {str(event.time)} </time>
        </div>
      </a>
      <footer />
    </article>;
};

[@react.component]
let make = (~events: FetchData.events, ~numberOfVisibleEvents: int) => {
  Array.sub(events, 0, numberOfVisibleEvents)
  |> Array.map((event: FetchData.event) => <Event key={event.id} event />)
  |> ReasonReact.array;
};
