open Utils;

type state = {
  events: FetchData.events,
  loading: bool
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
    initialState: () => {events: [||], loading: false},
    reducer: (action, state) =>
      switch action {
      | Loading => ReasonReact.Update({...state, loading: true})
      | Loaded(data) => ReasonReact.Update({events: data, loading: false})
      },
    didMount: (self) => {
      fetchEvents(self);
      /* FetchData.fetchEvent(); */
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
                  self.state.loading ?
                    ReasonReact.stringToElement("loading") : <EventList events=self.state.events />
                )
              </div>
            </div>
          </section>
        </div>
      </div>
  }
};