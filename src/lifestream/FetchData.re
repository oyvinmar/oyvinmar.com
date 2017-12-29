[@bs.module] external pinboardLogo : string = "./pinboard.svg";

[@bs.module] external twitterLogo : string = "./twitter.svg";

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
  let toLocaleString = (dateString) : string => {
    let date = Js.Date.fromString(dateString);
    Js.Date.toLocaleString(date)
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

let fetchEvents = (callback) => {
  let promiseAll = Js.Promise.all([|fetchBookmarks(), fetchTweets()|]);
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