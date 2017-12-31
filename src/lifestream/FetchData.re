[@bs.module] external pinboardLogo : string = "./pinboard.svg";

[@bs.module] external twitterLogo : string = "./twitter.svg";

[@bs.module] external swarmLogo : string = "./swarm.svg";

type event = {
  id: string,
  content: string,
  url: string,
  time: string,
  logo: string,
  serviceName: string,
  serviceUrl: string
};

type events = array(event);

module Decode = {
  let toLocaleString = (dateString) => {
    let date = Js.Date.fromString(dateString);
    Js.Date.toLocaleString(date)
  };
  let floatToLocaleString = (sinceEpoc) : string => {
    let jsDate = Js.Date.fromFloat(sinceEpoc);
    Js.Date.toLocaleString(jsDate)
  };
  let bookmark = (json) : event =>
    Json.Decode.{
      id: json |> field("dt", string),
      url: json |> field("u", string),
      content: json |> field("d", string),
      time: json |> field("dt", string) |> toLocaleString,
      serviceName: "Pinboard",
      logo: pinboardLogo,
      serviceUrl: "https://pinboard.in/"
    };
  let checkin = (json) : event =>
    Json.Decode.{
      id: json |> field("id", string),
      url:
        json
        |> at(["venue", "id"], string)
        |> ((venueId) => "https://foursquare.com/v/" ++ venueId),
      content:
        json
        |> at(["venue", "name"], string)
        |> ((venueName) => "Checked in at " ++ venueName ++ "."),
      time:
        json
        |> field("createdAt", int)
        |> float_of_int
        |> ((createdAt) => createdAt *. 1000.0)
        |> floatToLocaleString,
      serviceName: "Swarm",
      logo: swarmLogo,
      serviceUrl: "https://foursquare.com/"
    };
  let checkins = (json) : array(event) =>
    Json.Decode.(json |> at(["response", "checkins", "items"], array(checkin)));
  let bookmarks = (json) : array(event) => Json.Decode.(json |> array(bookmark));
  let tweet = (json) : event =>
    Json.Decode.{
      id: json |> field("id_str", string),
      url: "https://twitter.com/#!/oyvinmar/status/",
      content: json |> field("text", string),
      time: json |> field("created_at", string) |> toLocaleString,
      serviceName: "Twitter",
      logo: twitterLogo,
      serviceUrl: "https://twitter.com/"
    };
  let tweets = (json) : array(event) => Json.Decode.(json |> array(tweet));
};

let fetchTweets = () =>
  Js.Promise.(
    Fetch.fetch("/twitter/feed/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.tweets |> ((events) => resolve(events)))
  );

let fetchBookmarks = () =>
  Js.Promise.(
    Fetch.fetch("/pinboard/feed/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.bookmarks |> ((events) => resolve(events)))
  );

let fetchCheckins = () =>
  Js.Promise.(
    Fetch.fetch("/swarm/feed/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.checkins |> ((events) => resolve(events)))
  );

let fetchEvents = (callback) => {
  let promiseAll = Js.Promise.all([|fetchBookmarks(), fetchTweets(), fetchCheckins()|]);
  Js.Promise.(
    promiseAll
    |> then_(
         (result) => {
           let all = Array.fold_left((a, b) => Array.append(a, b), [||], result);
           callback(all);
           resolve(result)
         }
       )
  )
};