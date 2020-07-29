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
  <div className="space-y-3">
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
           className="btn"
           onClick={_event => dispatch(ShowMore)}>
           <span> {str("Show More")} </span>
         </button>,
       |]
       |> ReasonReact.array
     | ERROR => ReasonReact.null
     }}
  </div>;
};
