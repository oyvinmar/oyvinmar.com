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
    };

    var handlePinboardRespons = function(json) {
      _.each(json, function (bookmark) {
          window.app.add(bookmark.d, bookmark.u, "Pinboard.in", "http://pinboard.in/", new Date(bookmark.dt));
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
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          },
          success: handlePinboardRespons
        });
      },

      foursquare_timeline: function (){
        jQuery.ajax({
          url: "https://feeds.foursquare.com/history/PSZFPVP4IYXROETWCD5DPPKPLO3GU3IE.rss",
          dataType: "xml",
          success: function( data ) {
            if (console && console.log){
              console.log( 'Sample of data:', data.slice(0,100) );
            }
          }
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

