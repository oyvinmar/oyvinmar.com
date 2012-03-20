var RemoteCallApi = (function() {
  var instantiated;

  function init() {
    var replace_url = function(url) {

    };

    var handleTwitterResponse = function(data) {
      var len = data.length
      for (var i = 0; i < len; i++) {
        var date = new Date(data[i].created_at);
        var text = data[i].text;
        _.each(data[i].entities.urls, function (url) {
          text = text.replace(url.url, '<a href="' + url.url + '">' + url.url + '</a>');
        });
        window.app.add(text, "https://twitter.com/#!/oyvinmar/status/" + data[i].id, "Twitter", "http://twitter.com", date);
      }
      window.app.view.render();
    };

    var handlePinboardRespons = function(json) {
      _.each(json, function (bookmark) {
          window.app.add(bookmark.d, bookmark.u, "Pinboard.in", "http://pinboard.in/", new Date(bookmark.dt));
      });
      window.app.view.render();
    };

    var handleFoursquareRespons = function(json) {
     _.each(json.response.checkins.items, function(checkin) {
        var description = "Checked in at " + checkin.venue.name;
        if (checkin.venue.hereNow) {
          description += " with " + checkin.venue.hereNow + " others";
        }
        description += ".";
        window.app.add(description, "https://foursquare.com/v/" + checkin.venue.id, "Foursquare", "http://foursquare.com", new Date(checkin.createdAt * 1000));
     });
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
          success: handlePinboardRespons
        });
      },

      fetch_foursquare_timeline: function (){
        jQuery.ajax({
          url: "/foursquare/feed/",
          dataType: "json",
          success: handleFoursquareRespons
        });
      }
    }
  }
  return {
    getInstance: function() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();

