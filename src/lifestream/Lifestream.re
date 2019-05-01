open Utils;

type fetch =
  | INITIAL
  | PENDING
  | SUCCESS
  | ERROR;

type state = {
  numberOfVisibleEvents: int,
  events: FetchData.events,
  fetch
};

type action =
  | ShowMore
  | Loaded(FetchData.events)
  | Loading;

let component = ReasonReact.reducerComponent("Lifestream");

let make = (_children) => {
  let fetchEvents = ({ReasonReact.send}) => {
    /* FetchData.fetchEvents(reduce((payload) => Loaded(payload))) |> ignore; */
    FetchData.fetchEvents((payload) => send(Loaded(payload))) |> ignore;
    send(Loading)
  };
  {
    ...component,
    initialState: () => {events: [||], fetch: INITIAL, numberOfVisibleEvents: 5},
    reducer: (action, state) =>
      switch action {
      | ShowMore =>
        ReasonReact.Update({...state, numberOfVisibleEvents: state.numberOfVisibleEvents + 10})
      | Loading => ReasonReact.Update({...state, fetch: PENDING})
      | Loaded(data) => ReasonReact.Update({...state, events: data, fetch: SUCCESS})
      },
    didMount: (self) => {
      fetchEvents(self);
    },
    render: (self) =>
      <div className="section" id="lifestream">
        <div className="container">
          <header className="row section-header"> <h2> (str("Lifestream")) </h2> <hr /> </header>
          <section className="row">
            <div className="col-md-12">
              <p className="pretext">
                (
                  str(
                    "If this content is up-to-date, I'm probably still alive. If not, lets hope it is a bug in my code..."
                  )
                )
              </p>
              <div>
                (
                  switch self.state.fetch {
                  | INITIAL => ReasonReact.null
                  | PENDING => <EventListPlaceholder />
                  | SUCCESS =>
                    [|
                      <EventList
                        key="eventList"
                        numberOfVisibleEvents=self.state.numberOfVisibleEvents
                        events=self.state.events
                      />,
                      <button
                        key="button"
                        className="btn btn-primary show-more"
                        onClick=(_event => self.send(ShowMore))>
                        <i className="fa fa-plus" />
                        <span> (str(" Show More")) </span>
                      </button>
                    |]
                    |> ReasonReact.array
                  | ERROR => ReasonReact.null
                  }
                )
              </div>
            </div>
          </section>
        </div>
      </div>
  }
};