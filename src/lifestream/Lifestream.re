open Utils;

type fetch =
  | INITIAL
  | PENDING
  | SUCCESS
  | ERROR;

type state = {
  events: FetchData.events,
  fetch,
};

type action =
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
        | Loading => {...state, fetch: PENDING}
        | Loaded(data) => {events: data, fetch: SUCCESS}
        },
      {events: [||], fetch: INITIAL},
    );

  React.useEffect1(
    () => {
      fetchEvents(dispatch);
      Some(() => ());
    },
    [||],
  );
  <div className="space-y-5">
    <h1> {str("What's happening?")} </h1>
    <div className="space-y-6">
      {switch (state.fetch) {
       | INITIAL => ReasonReact.null
       | PENDING => <EventListPlaceholder />
       | SUCCESS => <EventList key="eventList" events={state.events} />
       | ERROR => ReasonReact.null
       }}
    </div>
  </div>;
};
