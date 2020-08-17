// [@bs.module "./registerServiceWorker"]
// external register_service_worker: unit => unit = "default";

// register_service_worker();

switch (ReactDOM.querySelector("#root")) {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
};
