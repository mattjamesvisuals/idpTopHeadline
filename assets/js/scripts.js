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

    $.get("https://www.denverpost.com/feed/", function(data, status) {

        var xmlDoc = $.parseXML(data);
        var xml = $(xmlDoc);
        var items = xml.find('item');
        var articles = {};
        var newsCategories = ['news', 'sports', 'business', 'entertainment', 'lifestyle', 'opinion', 'politics', 'cannabist', 'weather'];
        // console.log(xmlDoc);
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

                // create a json object for each category
                articles[category] = {
                    "title": item.children('title').text(),
                    "blurb": item.children('description').text()
                };
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
    }, 'text');
});
