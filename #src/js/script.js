jQuery(document).ready(function ($) {

  $(".top-line").sticky({
    topSpacing:0
  });
  $(".fancybox").fancybox({
    touch:false,
    autoFocus:false,
  });

  $(function() {
    $(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();
    $(".accordion > .accordion-item").click(function() {
      $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
      $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
    });
  });
});

