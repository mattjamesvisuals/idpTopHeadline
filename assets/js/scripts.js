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

feeds["news"];



$(document).ready(function() {

  for (var category in feeds){
    console.log (feeds[category]);
    $.get(feeds[category], function(data, status) {

            var xmlDoc = $.parseXML(data);
            var xml = $(xmlDoc);
            var articles = xml.find('item');
            articles.each(function() {
                var item = $(this);
                var title = item.find('title').text();
                var link = item.find('link').text();
                var description = item.find('description').text();
                console.log (category, title);
                 return false;
              });

            //console.log (xml);
          },
          'text');
  }

    /*$.get("", function(data, status) {

            var xmlDoc = $.parseXML(data);
            var xml = $(xmlDoc);
            var items = xml.find('item');
            var articles = {}
            //console.log(xmlDoc);
            // console.log(xml);
            // console.log('items', items);

            // loop through each item / article
            items.each(function() {
                var item = $(this);
                var categories = item.find('category');

                // loop through each category in an article
                categories.each(function() {
                    // get the category name
                    var category = $(this).text();
                    if (newsCategories.includes(category.toLowerCase()) && !articles[category]) {


                        // create a json object for each category
                        articles[category] = {
                            "title": item.children('title').text(),
                            "blurb": item.children('description').text()
                        };


                    }
                });
            });


            // after we have sorted out all of articles and have one per category,
            // loop through each category and try to write articles to divs
            for (var category in articles) {
                if (newsCategories.includes(category.toLowerCase())) {
                    // Get the class name of the div based on the category name (.newsheadline, .newsdesc)
                    var headlineDiv = '.' + category.toLowerCase() + 'headline';
                    var blurbDiv = '.' + category.toLowerCase() + 'feed';

                    if ($(headlineDiv)) {
                        var titleTag = $(headlineDiv);
                        var descTag = $(blurbDiv);
                        titleTag.html(articles[category].title);
                        descTag.html(articles[category].blurb);
                    }
                }
            }
        },
        'text');*/
});
