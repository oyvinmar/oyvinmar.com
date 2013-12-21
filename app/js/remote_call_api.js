var RemoteCallApi = (function() {
  var instantiated;

  function init() {

    var handleTwitterResponse = function(data) {
      var len = data.length, i = 0;

      for (i = 0; i < len; i++) {
        var date = new Date(data[i].created_at);
        var text = data[i].text;
        _.each(data[i].entities.urls, function (url) {
          text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
        });
        window.app.add(text, "https://twitter.com/#!/oyvinmar/status/" + data[i].id, "Twitter", "http://twitter.com", date);
      }

      window.app.view.render();
    };

    var handlePinboardResponse = function(json) {
      _.each(json, function (bookmark) {
        window.app.add(bookmark.d, bookmark.u, "Pinboard.in", "http://pinboard.in/", new Date(bookmark.dt));
      });
      window.app.view.render();
    };

    var handleFoursquareResponse = function(json) {
      _.each(json.response.checkins.items, function(checkin) {
        var description = "Checked in at " + checkin.venue.name;
        if (checkin.venue.hereNow) {
          description += " with " + checkin.venue.hereNow + " others";
        }
        description += ".";
        window.app.add(description, "https://foursquare.com/v/" + checkin.venue.id, "Foursquare", 
                        "http://foursquare.com", new Date(checkin.createdAt * 1000));
      });
      window.app.view.render();
    };

    var createGithubLink = function(path) {
      return "<a href=\"https://github.com/" + path + "\">" + path + "</a>"
    }

    var plural = function(string, count) {
      if (count > 1) {
        return string + 's';
      } else {
        return string;
      }
    }

    var handleGithubResponse = function(events) {
      _.each(events, function(github_event) {
        var description;
        if(github_event.type === "WatchEvent"){
          description = "Starred " + createGithubLink(github_event.repo.name);
        } else if (github_event.type === "PushEvent"){
          var commit_text = plural(" commit", github_event.payload.distinct_size); 
          description = "Pushed " + commit_text + " to " + createGithubLink(github_event.repo.name);
        } else if (github_event.type === "PullRequestEvent" && github_event.payload.action === "closed") {
          var pull_request = github_event.payload.pull_request;
          description = "Closed pull request <a href=\"" + pull_request.html_url + "\">" + 
                          github_event.repo.name + "#" + pull_request.number + "</a> from " + createGithubLink(pull_request.user.login);
        }

        if (description) {
          window.app.add(description, "https://github.com/" + github_event.repo.name, "Github",
                          "https://github.com", new Date(github_event.created_at))
        }
      });
      window.app.view.render();
    };

    return {
      fetch_twitter_timeline: function() {
        jQuery.ajax({
          url: "/twitter/feed/",
          dataType: "json",
          success: handleTwitterResponse
        });
      },

      fetch_pinboard_feed: function (){
        jQuery.ajax({
          url: "/pinboard/feed/",
          dataType: "json",
          crossDomain: true,
          success: handlePinboardResponse
        });
      },

      fetch_foursquare_timeline: function (){
        jQuery.ajax({
          url: "/foursquare/feed/",
          dataType: "json",
          success: handleFoursquareResponse
        });
      },

      fetch_github_events: function (){
        jQuery.ajax({
          url: "/github/feed/",
          dataType: "json",
          success: handleGithubResponse
        });
      }
    };
  }

  return {
    getInstance: function() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };

}());

