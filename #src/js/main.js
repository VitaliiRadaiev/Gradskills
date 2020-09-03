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

	{
		let btn = document.querySelector('.top-line .btn-wrap');

		if(btn) {
			btn.addEventListener('click', (e) => {
				e.preventDefault();

				$('.top-line .btn-wrap .collapse').slideToggle(400);
			});

			document.body.addEventListener('click', (e) => {
				if(!e.target.closest('.top-line .btn-wrap')) {
					$('.top-line .btn-wrap .collapse').slideUp(400);
				}
			})
		}
	}

});

