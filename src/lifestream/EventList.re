module Event = {
  let component = ReasonReact.statelessComponent("Event");
  let dangerousHtml: string => Js.t('a) = (html) => {"__html": html};
  /* let content = Js.t('a) => { __html : event.content }); */
  let make = (~event: FetchData.event, _children) => {
    ...component,
    render: (_self) =>
      <article className="entry row">
        <div className="col-xs-3 col-sm-1">
          <img src=event.logo className="c-events__logo" alt="logo" />
        </div>
        <div className="col-xs-9 col-sm-offset-1 col-sm-10">
          <header>
            <a href=event.serviceUrl> (ReasonReact.stringToElement(event.serviceName)) </a>
          </header>
          <p dangerouslySetInnerHTML=(dangerousHtml(event.content)) />
          <a href=event.url>
            <time className="published"> (ReasonReact.stringToElement(event.time)) </time>
          </a>
        </div>
        <footer />
      </article>
  };
};

let component = ReasonReact.statelessComponent("EventList");

let make = (~events: FetchData.events, _children) => {
  ...component,
  render: (_self) =>
    <div>
      (
        events
        |> Array.map((event: FetchData.event) => <Event key=event.id event />)
        |> ReasonReact.arrayToElement
      )
    </div>
};