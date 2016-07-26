$('h2').css('color', '#8B0000', 'align', 'center');

function showDate() {
  var now = new Date();
  var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();

  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }

  tnow = new Date();
  thour = now.getHours();
  tmin = now.getMinutes();
  tsec = now.getSeconds();

  if (tmin <= 9) {
    tmin = "0" + tmin;
  }
  if (tsec <= 9) {
    tsec = "0" + tsec;
  }
  if (thour < 10) {
    thour = "0" + thour;
  }

  today = days[now.getDay()] + ", " + date + " " + months[now.getMonth()] + ", " + (fourdigits(now.getYear())) + " - " + thour + ":" + tmin + ":" + tsec;
  document.getElementById("dateDiv").innerHTML = today;
}
setInterval("showDate()", 1000);
//Feeds

$(document).ready(function() {

  var feeds = {
    "news": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/208801.xml",
    "sports": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/200303.xml",
    "business": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/200302.xml",
    "entertainment": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/200302.xml",
    "lifestyle": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/273504.xml",
    "opinion": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/207703.xml",
    "politics": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/273502.xml",
    "cannabist": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/282004.xml",
    "weather": "http://rss.denverpost.com/mngi/rss/CustomRssServlet/36/213601.xml",
  };

  // this object will store the articles we pull from the feeds
  var articleResults = {};

  $.when(

      console.log('wait for it....'),
      
      // have to pass a comma delimited list of tasks here to run (the $.get())
      $.get(feeds["entertainment"], function(data, status) {
        articleResults = populateArticleDetails(articleResults, data, "entertainment");
      }, 'text'),

      $.get(feeds["sports"], function(data, status) {
        articleResults = populateArticleDetails(articleResults, data, "sports");
      }, 'text'),

      $.get(feeds["business"], function(data, status) {
        articleResults = populateArticleDetails(articleResults, data, "business");
      }, 'text'),

      $.get(feeds["lifestyle"], function(data, status) {
        articleResults = populateArticleDetails(articleResults, data, "lifestyle");
      }, 'text'),

      $.get(feeds["politics"], function(data, status) {
        articleResults = populateArticleDetails(articleResults, data, "politics");
      }, 'text')

  ).then(function() {
    console.log (articleResults);
  });

  // this function takes what came back from the feed and parses it to get the right details.
  function populateArticleDetails(articleResults, data, category) {
    var xmlDoc = $.parseXML(data);
    var xml = $(xmlDoc);
    var articles = xml.find('item');

    articles.each(function() {
      var item = $(this);
      var title = item.find('title').text();
      var link = item.find('link').text();
      var description = item.find('description').text();

      articleResults[category] = {
        title: title,
        link: link,
        description: description
      };
      return false;
    });
    return articleResults;
  }
});
