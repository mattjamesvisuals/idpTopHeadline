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




        }, 'text')
        .done(function() {

            var aDivs = [];

            for (var category in articles) {
                if (newsCategories.includes(category.toLowerCase())) {
                    

                    console.log("writing content for category: ", category);


                    var myhref = articles[category].link;
                    var myTitle = articles[category].title;
                    var myBlurb = articles[category].blurb;


                    var divHtml = '<div class="col-md-4">' +
                        '<a href="http://www.denverpost.com/' + category.toLowerCase() + '/"><h2>' + category + '</h2></a>' +
                        '<div class="headline"> ' + myTitle + ' +</div>' +
                        '<div class="blurb">' + myBlurb + '</div>' +
                        '</div>';
                    aDivs.push(divHtml);

                }
            }
            document.querySelector(".container");

        });
});

/*
Function that will accept a feed response and pull the details for an item
*/
function getItemDetails(data) {
    var xmlDoc = $.parseXML(data);
    var xml = $(xmlDoc);
    console.log('xml document', xml);
    var items = xml.find('channel');

    console.log('xml data', data);
    console.log('my items?', items);


    // loop through each item / article
    items.each(function() {
        var item = $(this);
        console.log('found an item?', item);
        // create a json object for each category
        return {
            "title": item.children('title').text(),
            "blurb": item.children('description').text(),
            "link": item.children('link').text()
        };
    });
}
