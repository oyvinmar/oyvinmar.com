[@bs.scope ("window", "location")] [@bs.val] external pathname : string = "pathname";

/* [@bs.module "./registerServiceWorker"] external register_service_worker : unit => unit = "default";
   register_service_worker(); */
let renderForRoute = (route) => ReactDOMRe.renderToElementWithId(<App route />, "root");

let router =
  DirectorRe.makeRouter({
    "/": () => renderForRoute(Routing.Home),
    "/cv": () => renderForRoute(Routing.Cv)
  });

DirectorRe.configure(router, {"html5history": true});

DirectorRe.init(router, pathname);