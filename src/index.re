[@bs.module "./registerServiceWorker"]
external register_service_worker: unit => unit = "default";

register_service_worker();

let renderForRoute = route =>
  ReactDOMRe.renderToElementWithId(<App route />, "root");

let handleRouteChange = (url: ReasonReact.Router.url) =>
  switch (url.path) {
  | ["cv"] => renderForRoute(Routing.Cv)
  | ["about"] => renderForRoute(Routing.About)
  | [] => renderForRoute(Routing.Home)
  | _ => ReasonReact.Router.push("/")
  };

handleRouteChange({
  path: RouteHelper.path(),
  hash: RouteHelper.hash(),
  search: RouteHelper.search(),
});

let watcherID = ReasonReact.Router.watchUrl(handleRouteChange);
