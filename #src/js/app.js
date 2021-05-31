var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };


jQuery(document).ready(function( $ ) {
	document.body.classList.add('is-load');

	// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	// === // Проверка, поддержка браузером формата webp ==================================================================

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

		if($('.text-content nav').length>0) {

			$(".text-content .anchor").click(function() {
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


		// === stars handler ================================================================================
			let rating = document.querySelectorAll('.stars-list');
			if(rating.length) {
				for(let listStars of rating) {
					for(let star = 0; star < listStars.dataset.amountstars; star++) {
						listStars.children[star].lastChild.className = 'icon-star-full';
					}
				}
			}
		// === // stars handler ================================================================================
		@@include('jquery.nicescroll.min.js');
		@@include('forms.js');


});

