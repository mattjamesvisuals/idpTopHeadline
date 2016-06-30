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
                        //console.log(xmlDoc);
                        //console.log(xml);
                        // console.log('items', items);

                        items.each(function() {
                                var item = $(this);
                                var categories = item.find('category');
                                // write out the title and description

                                categories.each(function() {
                                        if ($(this).text() == 'News') {
                                            $('.newsheadline').html(item.children('title').text());
                                            $('.newsfeed').html(item.children('description').text());
                                            console.log($(this).text())
                                                }
																				if ($(this).text() == 'Sports') {
																						$('.sportsheadline').html(item.children('title').text());
																						$('.sportsfeed').html(item.children('description').text());
																							console.log($(this).text())
																								}

																				if ($(this).text() == 'Business') {
																						$('.businessheadline').html(item.children('title').text());
																						$('.businessfeed').html(item.children('description').text());
																							console.log($(this).text())
																									}

																				if ($(this).text() == 'Entertainment') {
																						$('.entertainmentheadline').html(item.children('title').text());
																						$('.entertainmentfeed').html(item.children('description').text());
																							console.log($(this).text())
																						}

																				if ($(this).text() == 'Lifestyle') {
																						$('.lifestyleheadline').html(item.children('title').text());
																						$('.lifestylefeed').html(item.children('description').text());
																							console.log($(this).text())
																									}

																				if ($(this).text() == 'Opinion') {
																						$('.opinionheadline').html(item.children('title').text());
																						$('.opinionfeed').html(item.children('description').text());
																							console.log($(this).text())
																									}

																				if ($(this).text() == 'Politics') {
																						$('.politicsheadline').html(item.children('title').text());
																						$('.politicsfeed').html(item.children('description').text());
																							console.log($(this).text())
																									}

																				if ($(this).text() == 'Cannabist') {
																						$('.cannabistheadline').html(item.children('title').text());
																						$('.cannabistfeed').html(item.children('description').text());
																							console.log($(this).text())
																									}

																				if ($(this).text() == 'Weather') {
																						$('.weatherheadline').html(item.children('title').text());
																						$('.weatherfeed').html(item.children('description').text());
																							console.log($(this).text())
																									}



                                            });
                                        });
                                    // get the first item




                                }, 'text');

                        });
