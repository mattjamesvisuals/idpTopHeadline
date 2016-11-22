$body = $("body");

//.on when action(ajaxStart/ajaxStop) happens perform function
$(document).on({
    ajaxStart: function() {
        $body.addClass("loading");
    },
    ajaxStop: function() {
        $body.removeClass("loading");
    }
});

// Grab dp feed and assign to variable
// document.ready wait until entire page(dom) is loaded before proceeding with code
$(document).ready(function() {
    // once the page is loaded show the date and update every 5 minutes
    setInterval("showDate()", 1000 * 60 * 5);

    /* put code to show category form here */
    var categoryForm = $('.categoryForm');
    var submitButton = $('.submitButton');
    var closeButton = $('.closeButton');
    var cog = $('.cog');

    submitButton.on('click', function() {
      categoryForm.slideUp()

      // On submit check which inputs are selected and save to a cookie
      saveFeedCategoryPreferences();
    });

    closeButton.on('click', function() {
      categoryForm.slideUp()
    });

    cog.on('click', function() {
      categoryForm.slideToggle()
      $('.form-check-input').each(function() { console.log($(this).val() )});
    });


    $('#myModal').modal('show');


    // load the article content
    loadArticles();
});

/**
* Save the feed categories based on which checkboxes the users have selected
**/
//figure out whch categories are selected. find the values for each checked category
//create an array with checked categories
//save array to a cookie
function saveFeedCategoryPreferences() {
    var checkedValue = [];
    console.log('short cut to show items that are checked');
    $("input[type=checkbox]:checked").each(function() {
        console.log($(this).val() + ' is checked!');

        checkedValue.push($(this).val());
    })
    console.log ('checked value = ', checkedValue);
    document.cookie = checkedValue;

  }

/**
* This function is used to load all of the article content from the feed
**/
function loadArticles() {
    // create an empty object to store articles in
    var articles = {};
    var newsCategories = ['news', 'sports', 'business', 'entertainment', 'lifestyle', 'opinion', 'politics','crime & courts','traffic'];
    //get feed and runs code (ajax)
    $.get("http://www.denverpost.com/feed/", function(data, status) {
            //makes js interpret xml in order to run xml specific functions(".find") functions on xml
            var xmlDoc = $.parseXML(data);
            var xml = $(xmlDoc);
            var items = xml.find('item');

            //console.log(xmlDoc);
            // console.log(xml);
            //console.log('items', items);

            // loop through each item / article
            items.each(function() {
                var item = $(this);
                var categories = item.find('category');

                // loop through each category in an article
                categories.each(function() {
                    // get the category name
                    var category = $(this).text();
                    //if category in list then allow json creation && !articles[category])- if the category has been found skip
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
            // define the array and the html element target
            var aDivs = [];
            var content = document.querySelector('#content');
            //category is being defined
            for (category in articles) {
                if (newsCategories.includes(category.toLowerCase())) {
                    //console.log for de-bugging purposes
                    console.log("writing content for category: ", category);

                    //defining variables based on the content in the json object
                    var myhref = articles[category].link;
                    var myTitle = articles[category].title;
                    var myBlurb = articles[category].blurb;
                    //defining what content from the json object gets put into the divHtml variable
                    var divHtml = '<div class="col-md-4">' +
                        '<a href="http://www.denverpost.com/' + category.toLowerCase() + '/"><h2 class = "cStyle">' + category + '</h2></a>' +
                        '<a target="_blank" class= "hColor" href="' + myhref + '">' + myTitle + '</a>' + '<div class="headline"> ' + '</div>' +
                        '<div class="blurb">' + myBlurb + '</div>' +
                        '</div>';
                    //pushes the divHtml variable content into the aDivs array
                    aDivs.push(divHtml);
                }
            }

            // start a row before you start the loop
            var results = '<div class="row">';
            var divCount;
            //make sure that a new row is spit out everytime there are 3 articles plugged in
            for (i = 0; i < aDivs.length; i++) {
                divCount = i + 1;
                results = results + aDivs[i];
                console.log('divCount = ' + divCount);
                // if this is the 3rd div then close the row and open a new one
                if (divCount % 3 === 0) {
                    console.log('should be ending row');
                    results = results + '</div><div class="row">';
                }
            }

            // after all the divs are done close the row
            results = results + '</div>';

            // once we've got all of the html stored in the "results" string then plug it into page
            content.innerHTML = results + content.innerHTML;
        });
}


// Date and Time Code
$('h2').css('color', '#8B0000', 'align', 'center'); // what is this?  Can just be in css
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
