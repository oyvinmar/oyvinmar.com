[@bs.scope ("window", "location")] [@bs.val] external pathname : string = "pathname";

[@bs.module "./registerServiceWorker"] external register_service_worker : unit => unit = "default";

[@bs.val] external setTimeout : (unit => unit, int) => float = "setTimeout";

register_service_worker();

let renderForRoute = (route) => ReactDOMRe.renderToElementWithId(<App route />, "root");

let router = DirectorRe.makeRouter({"/": "home", "/cv": "cv", "*": "notfound"});

let handlers = {
  "home": () => renderForRoute(Routing.Home),
  "cv": () => renderForRoute(Routing.Cv),
  "notfound": () => setTimeout(() => DirectorRe.setRoute(router, "/"), 500)
};

DirectorRe.configure(router, {"html5history": true, "resource": handlers});

DirectorRe.init(router, pathname);