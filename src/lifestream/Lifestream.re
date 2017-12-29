open Utils;

type fetch =
  | INITIAL
  | PENDING
  | SUCCESS
  | ERROR;

type state = {
  events: FetchData.events,
  fetch
};

type action =
  | Loaded(FetchData.events)
  | Loading;

let component = ReasonReact.reducerComponent("Lifestream");

let make = (_children) => {
  let fetchEvents = ({ReasonReact.reduce}) => {
    FetchData.fetchEvents(reduce((payload) => Loaded(payload))) |> ignore;
    reduce(() => Loading, ())
  };
  {
    ...component,
    initialState: () => {events: [||], fetch: INITIAL},
    reducer: (action, state) =>
      switch action {
      | Loading => ReasonReact.Update({...state, fetch: PENDING})
      | Loaded(data) => ReasonReact.Update({events: data, fetch: SUCCESS})
      },
    didMount: (self) => {
      fetchEvents(self);
      ReasonReact.NoUpdate
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
                  | INITIAL => ReasonReact.nullElement
                  | PENDING => <EventListPlaceholder />
                  | SUCCESS => <EventList events=self.state.events />
                  | ERROR => ReasonReact.nullElement
                  }
                )
              </div>
            </div>
          </section>
        </div>
      </div>
  }
};