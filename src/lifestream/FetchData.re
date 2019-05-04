[@bs.module] external pinboardLogo : string = "./pinboard.svg";

[@bs.module] external twitterLogo : string = "./twitter.svg";

[@bs.module] external swarmLogo : string = "./swarm.svg";

[@bs.module] external githubLogo : string = "./github.svg";

type event = {
  id: string,
  content: string,
  url: string,
  time: string,
  timestamp: float,
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
  let getTime = (dateString) => {
    let date = Js.Date.fromString(dateString);
    Js.Date.getTime(date)
  };
  let join = (s1, s2) : string => s1 ++ s2;
  let bookmark = (json) : event =>
    Json.Decode.{
      id: json |> field("dt", string),
      timestamp: json |> field("dt", string) |> getTime,
      url: json |> field("u", string),
      content: json |> field("d", string),
      time: json |> field("dt", string) |> toLocaleString,
      serviceName: "Pinboard",
      logo: pinboardLogo,
      serviceUrl: "https://pinboard.in/"
    };
  let bookmarks = (json) : array(event) => Json.Decode.(json |> array(bookmark));
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
      timestamp:
        json |> field("createdAt", int) |> float_of_int |> ((createdAt) => createdAt *. 1000.0),
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
  let tweet = (json) : event =>
    Json.Decode.{
      id: json |> field("id_str", string),
      url: "https://twitter.com/#!/oyvinmar/status/",
      content: json |> field("text", string),
      time: json |> field("created_at", string) |> toLocaleString,
      timestamp: json |> field("created_at", string) |> getTime,
      serviceName: "Twitter",
      logo: twitterLogo,
      serviceUrl: "https://twitter.com/"
    };
  let tweets = (json) : array(event) => Json.Decode.(json |> array(tweet));
  let createGithubLink = (path) => {j|<a href="https://github.com/$path">$path</a>|j};
  let plural = (str, count) =>
    switch count {
    | 1 => str
    | _ => str ++ "s"
    };
  let githubEvent = (json) : event =>
    Json.Decode.{
      id: json |> field("id", string),
      url: json |> at(["repo", "name"], string) |> join("https://github.com/"),
      content:
        json
        |> (
          (json) => {
            let eType = field("type", string, json);
            let repoName = at(["repo", "name"], string, json);
            let action = optional(at(["payload", "action"], string), json);
            switch (eType, action) {
            | ("PullRequestEvent", Some("closed")) =>
              let htmlUrl = at(["payload", "pull_request", "html_url"], string, json);
              let number = at(["payload", "pull_request", "number"], int, json);
              let user = at(["payload", "pull_request", "user", "login"], string, json);
              let link = createGithubLink(user);
              {j|Closed pull request <a href="$htmlUrl">$repoName#$number</a> from $link|j}
            | ("WatchEvent", Some("started")) => "Starred " ++ createGithubLink(repoName) ++ "."
            | ("PushEvent", None) =>
              let size = at(["payload", "distinct_size"], int, json);
              "Pushed  " ++ plural("commit", size) ++ " to " ++ createGithubLink(repoName) ++ "."
            | _ => ""
            }
          }
        ),
      time: json |> field("created_at", string) |> toLocaleString,
      timestamp: json |> field("created_at", string) |> getTime,
      serviceName: "Github",
      logo: githubLogo,
      serviceUrl: "https://github.com/"
    };
  let githubEvents = (json) : array(event) =>
    Json.Decode.(json |> array(githubEvent))
    |> Array.to_list
    |> List.filter((item) => item.content != "")
    |> Array.of_list;
};

let fetchTweets = () =>
  Js.Promise.(
    Fetch.fetch("/api/twitter/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.tweets |> ((events) => resolve(events)))
  );

let fetchBookmarks = () =>
  Js.Promise.(
    Fetch.fetch("/api/pinboard/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.bookmarks |> ((events) => resolve(events)))
  );

let fetchCheckins = () =>
  Js.Promise.(
    Fetch.fetch("/api/swarm/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.checkins |> ((events) => resolve(events)))
  );

let fetchGithubEvents = () =>
  Js.Promise.(
    Fetch.fetch("/api/github/")
    |> then_(Fetch.Response.json)
    |> then_((json) => json |> Decode.githubEvents |> ((events) => resolve(events)))
  );

let fetchEvents = (callback) => {
  let promiseAll =
    Js.Promise.all([|fetchBookmarks(), fetchTweets(), fetchCheckins(), fetchGithubEvents()|]);
  Js.Promise.(
    promiseAll
    |> then_(
         (result) => {
           let all = Array.fold_left((a, b) => Array.append(a, b), [||], result);
           Array.sort((a, b) => a.timestamp > b.timestamp ? (-1) : 1, all);
           callback(all);
           resolve(result)
         }
       )
  )
};