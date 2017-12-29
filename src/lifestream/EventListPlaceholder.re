module EventPlaceholder = {
  let component = ReasonReact.statelessComponent("EventPlaceholder");
  let make = (_children) => {
    ...component,
    render: (_self) =>
      <article className="entry row">
        <div className="col-xs-3 col-sm-1"> <div className="c-placeholder__logo u-pulse" /> </div>
        <div className="col-xs-9 col-sm-offset-1 col-sm-10">
          <div className="c-placeholder__header u-pulse" />
          <div className="c-placeholder__content u-pulse" />
          <div className="c-placeholder__time u-pulse" />
        </div>
      </article>
  };
};

let component = ReasonReact.statelessComponent("EventListPlaceholder");

let make = (_children) => {
  ...component,
  render: (_self) =>
    <div>
      (
        [|1, 2, 3, 4, 5|]
        |> Array.map((num) => <EventPlaceholder key=(string_of_int(num)) />)
        |> ReasonReact.arrayToElement
      )
    </div>
};