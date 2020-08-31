@@include('burger.js');


$(document).ready(function() {

	if($('header .bottom-menu').length>0) {

		$("header .anchor").click(function() {
		  var elementClick = $(this).attr("href")
		  var destination = $(elementClick).offset().top - 100;
		  jQuery("html:not(:animated),body:not(:animated)").animate({
		    scrollTop: destination
		  }, 600);
		  return false;
		});

	}
});

