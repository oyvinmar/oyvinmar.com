var RemoteCallApi = (function() {
  var instantiated;

  function init() {
    var handleTwitterResponse = function(data) {
      var len = data.length
      for (var i = 0; i < len; i++) {
        var date = new Date(data[i].created_at);
        window.app.add(data[i].text, "https://twitter.com/#!/oyvinmar/status/" + data[i].id, "Twitter", "http://twitter.com", date);
      }
    }

    return {
      fetch_twitter_timeline: function() {
        jQuery.ajax({
          url: "https://api.twitter.com/1/statuses/user_timeline.json?screen_name=oyvinmar",
          dataType: "jsonp",
          success: handleTwitterResponse
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

