open Utils;

type fetch =
  | INITIAL
  | PENDING
  | SUCCESS
  | ERROR;

type state = {
  numberOfVisibleEvents: int,
  events: FetchData.events,
  fetch,
};

type action =
  | ShowMore
  | Loaded(FetchData.events)
  | Loading;

[@react.component]
let make = () => {
  let fetchEvents = dispatch => {
    FetchData.fetchEvents(payload => dispatch(Loaded(payload))) |> ignore;
    dispatch(Loading);
  };

  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | ShowMore => {
            ...state,
            numberOfVisibleEvents: state.numberOfVisibleEvents + 10,
          }
        | Loading => {...state, fetch: PENDING}
        | Loaded(data) => {...state, events: data, fetch: SUCCESS}
        },
      {events: [||], fetch: INITIAL, numberOfVisibleEvents: 5},
    );

  React.useEffect1(
    () => {
      fetchEvents(dispatch);
      Some(() => ());
    },
    [||],
  );
  <div className="section" id="lifestream">
    <div className="container">
      <header className="row section-header">
        <h2> {str("Lifestream")} </h2>
        <hr />
      </header>
      <section className="row">
        <div className="col-md-12">
          <p className="pretext">
            {str(
               "If this content is up-to-date, I'm probably still alive. If not, lets hope it is a bug in my code...",
             )}
          </p>
          <div>
            {switch (state.fetch) {
             | INITIAL => ReasonReact.null
             | PENDING => <EventListPlaceholder />
             | SUCCESS =>
               [|
                 <EventList
                   key="eventList"
                   numberOfVisibleEvents={state.numberOfVisibleEvents}
                   events={state.events}
                 />,
                 <button
                   key="button"
                   className="btn btn-primary show-more"
                   onClick={_event => dispatch(ShowMore)}>
                   <i className="fa fa-plus" />
                   <span> {str(" Show More")} </span>
                 </button>,
               |]
               |> ReasonReact.array
             | ERROR => ReasonReact.null
             }}
          </div>
        </div>
      </section>
    </div>
  </div>;
  /* } */
};