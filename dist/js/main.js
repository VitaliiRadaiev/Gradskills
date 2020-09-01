// === Burger Handler =====================================================================
	function burgerBtnAnimation(e) {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		let classNameElem = document.querySelector('.burger').dataset.activel;
		document.querySelector(`.${classNameElem}`).classList.toggle('open');

		let applyHead = document.querySelector('.apply-now-head');
		if(applyHead) {
			applyHead.classList.toggle('open');
		}
		$('.' + classNameElem +'').slideToggle(300);
	}
	$('.burger').click((e) => burgerBtnAnimation(e));

	{
		if($('.blog-burger').length>0) {
			$('.blog-burger').click(function() {
				$('.blog-burger span:nth-child(1)').toggleClass('first');
				$('.blog-burger span:nth-child(2)').toggleClass('second');
				$('.blog-burger span:nth-child(3)').toggleClass('third');
				$('.blog-burger span:nth-child(4)').toggleClass('fourth');

				$('.top-blog-list__menu-wrap').slideToggle(300);
			});
		}
	}
// === Burger Handler =====================================================================	;


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

