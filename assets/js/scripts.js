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
        console.log(xmlDoc);
        //console.log(xml);
        // console.log('items', items);

        items.each(function() {
            var item = $(this);
            console.log(item);
            var categories = item.find('category');

            // write out the title and description

            categories.each(function() {
                var category = $(this).text();
                articles[category] = {
                  "title": item.children('title').text(),
                  "blurb": item.children('description').text()
                };
            });
        });
        // get the first item

        console.log(articles);

        // for (var category in articles) {
        //   console.log(category.toLowerCase());
        //   if ($('.' + category.toLowerCase() + 'headline')) {
        //     var titleTag = $('.' + category.toLowerCase() + 'headline');
        //     var descTag = $('.' + category.toLowerCase() + 'desc');
        //     titleTag.html(category.title);
        //     descTag.html(category.blurb);
        //   }
        // }

        });


    }, 'text');
