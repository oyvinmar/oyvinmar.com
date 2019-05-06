open Utils;

module Event = {
  let dangerousHtml: string => Js.t('a) = html => {"__html": html};
  [@react.component]
  let make = (~event: FetchData.event) =>
    <article className="entry row">
      <div className="col-xs-3 col-sm-1">
        <img src={event.logo} className="c-events__logo" alt="logo" />
      </div>
      <div className="col-xs-9 col-sm-offset-1 col-sm-10">
        <header>
          <a href={event.serviceUrl}> {str(event.serviceName)} </a>
        </header>
        <p dangerouslySetInnerHTML={dangerousHtml(event.content)} />
        <a href={event.url}>
          <time className="published"> {str(event.time)} </time>
        </a>
      </div>
      <footer />
    </article>;
};

[@react.component]
let make = (~events: FetchData.events, ~numberOfVisibleEvents: int) =>
  <div>
    {Array.sub(events, 0, numberOfVisibleEvents)
     |> Array.map((event: FetchData.event) => <Event key={event.id} event />)
     |> ReasonReact.array}
  </div>;