$body = $("body");

$(document).on({
    ajaxStart: function() {
        $body.addClass("loading");
    },
    ajaxStop: function() {
        $body.removeClass("loading");
    }
});



//Date and Time Code
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



//Grab dp feed and assign to variable

$(document).ready(function() {
    $('#myModal').modal('show');
    var articles = {};
    var newsCategories = ['news', 'sports', 'business', 'entertainment', 'lifestyle', 'opinion', 'politics'];

    $.get("http://www.denverpost.com/feed/", function(data, status) {

            // secondary feeds in case primary feed article is empty
            var feeds = {
                "news": "http://denverpost.com/feature/app-news/feed/",
                "sports": "http://www.denverpost.com/feature/app-sports/feed/",
                "business": "http://denverpost.com/business/feed/",
                "entertainment": "http://www.denverpost.com/entertainment/feed/",
                "lifestyle": "http://denverpost.com/lifestyle/feed/",
                "opinion": "http://denverpost.com/opinion/feed/",
                "politics": "http://denverpost.com/politics/feed/",
                "cannabist": "http://www.thecannabist.co/feed/",
                "weather": "http://m.accuweather.com/en/us/denver-co/80203/weather-forecast/347810",
            };

            var xmlDoc = $.parseXML(data);
            var xml = $(xmlDoc);
            var items = xml.find('item');

            //console.log(xmlDoc);
            // console.log(xml);
            console.log('items', items);

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
                        articles[category.toLowerCase()] = {
                            "title": item.children('title').text(),
                            "blurb": item.children('description').text(),
                            "link": item.children('link').text()
                        };

                        //exiting the catagories loop
                        return;
                    }
                });
            });

            var yourMom = [];
            $.when(
                    // for (var i = 0; i < newsCategories.length; i++) {
                    //     var category = newsCategories[i];
                    //     if (!articles.hasOwnProperty(category)) {
                    //
                    //         console.log(newsCategories[i]);
                    //         console.log(feeds[category]);

                            //calling feed and parsing
                            $.get(feeds['sports'], function(data) {
                                yourMom.push(data);
                            }),

                            $.get(feeds['opinion'], function(data) {
                                yourMom.push(data);
                            })
                      //  }
                    // }
                ).then(function() {
                  console.log('yourMom', yourMom);
                });

            // after we have sorted out all of articles and have one per category,
            // loop through each category and try to write articles to divs


        }, 'text')
        .done(function() {
            for (var category in articles) {
                if (newsCategories.includes(category.toLowerCase())) {
                    // Get the class name of the div based on the category name (.newsheadline, .newsfeed)
                    var headlineDiv = '.' + category.toLowerCase() + 'headline';
                    var blurbDiv = '.' + category.toLowerCase() + 'feed';

                    /*  var articles = {
                        'sports': {
                          'title': 'go fuck yo self',
                          'blurb': 'something long',
                          'link': 'http://fuckit'
                        },
                        'news': {
                          'title': 'go fuck yo self',
                          'blurb': 'something long'
                        }
                      }; */

                    if ($(headlineDiv)) {
                        console.log("writing content for category: ", category);
                        var titleTag = $(headlineDiv);
                        var descTag = $(blurbDiv);
                        var myhref = articles[category].link;
                        titleTag.html('<a target="_blank" href="' + myhref + '">' + articles[category].title + '</a>');
                        descTag.html(articles[category].blurb);
                    }
                }
            }
        });
});
