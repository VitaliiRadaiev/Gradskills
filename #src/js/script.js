@@include('plagins/swiper-bundle.js');

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

  if($('.anchor').length>0) {
    $(".anchor").click(function() {
      var elementClick = $(this).attr("href")
      var destination = $(elementClick).offset().top - 100;
      jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: destination
      }, 600);
      return false;
    });
  }

  function anchor() {
    if($('.anchor').length>0) {
      $(".anchor").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top - 100;
        jQuery("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
        }, 600);
        return false;
      });
    }
  }
  anchor();

  const createTabsObj = () => {
    let obj = {};
    let tabs = document.querySelectorAll('.blog-content__tab');
    if(tabs.length) {
      tabs.forEach(i => {
        let id = i.dataset.tab;
        obj[id] = i.scrollHeight;
      })
    }
    return obj
  }

  let objHeight = createTabsObj();


  let tabs = document.querySelectorAll('.blog-content__tab');
  const updeteObjHeight = () => {
    if(tabs.length) {
      tabs.forEach(i => {
        let id = i.dataset.tab;
        objHeight[id] = i.scrollHeight;
      })
    }
  }

  let globalId;
  let globalTabsWrapper = document.querySelector('.blog-content__tabs-wrap');

  window.addEventListener('resize', () => {
    updeteObjHeight();
    if(globalTabsWrapper) {
      globalTabsWrapper.style.height = objHeight[globalId] + 'px';
    }
  })



  let $blogContentTabsTriggers = document.querySelectorAll('.blog-content__tabs-trigger-item');
  if($blogContentTabsTriggers.length) {
    let $blogHeroNavItems = document.querySelectorAll('.blog-hero__nav li');
    let $blogContentTabs = document.querySelectorAll('.blog-content__tab');
    let $triggerContainer = document.querySelector('.blog-content__tabs-trigger');
    let $triggersBorder = document.querySelector('.blog-content__tabs-trigger-border');
    let $tabsWrapper = document.querySelector('.blog-content__tabs-wrap');

    $blogContentTabsTriggers.forEach(trigger => {
      let id = trigger.dataset.tab;
      let left = trigger.getBoundingClientRect().left - $triggerContainer.getBoundingClientRect().left;
      let width = trigger.getBoundingClientRect().width;

      window.addEventListener('resize', () => {
         left = trigger.getBoundingClientRect().left - $triggerContainer.getBoundingClientRect().left;
         width = trigger.clientWidth;
      })

      if(trigger.classList.contains('active')) {
        let $navItem = document.querySelector(`.blog-hero__nav li[data-tab="${id}"]`);
        let $tab = document.querySelector(`.blog-content__tab[data-tab="${id}"]`);

        $navItem.classList.add('active');
        $tab.classList.add('active');
        $triggersBorder.style.left = left + 'px';
        $triggersBorder.style.width = width + 'px';

        if($tabsWrapper) {
          $tabsWrapper.style.height = objHeight[id] + 'px';
        }
        
        globalId = id;
      }

      trigger.addEventListener('click', () => {
        let $navItem = document.querySelector(`.blog-hero__nav li[data-tab="${id}"]`);
        let $tab = document.querySelector(`.blog-content__tab[data-tab="${id}"]`);
        updeteObjHeight();
        globalId = id;
        $navItem.classList.add('active');
        $tab.classList.add('active');
        trigger.classList.add('active');

        $triggersBorder.style.left = left + 'px';
        $triggersBorder.style.width = width + 'px';
        
        if($tabsWrapper) {
          $tabsWrapper.style.height = objHeight[id] + 'px';
        }

        $blogContentTabsTriggers.forEach(i => {
          if(i === trigger) return;
          i.classList.remove('active');
        })

        $blogHeroNavItems.forEach(i => {
          if(i === $navItem) return;
          i.classList.remove('active');
        })

        $blogContentTabs.forEach(i => {
          if(i === $tab) return;
          i.classList.remove('active');
        })

        showCollapsePostsHandler();
      })
    });
  }

  let $blogContentItems = document.querySelectorAll('.blog-content__item');
  if($blogContentItems.length) {
    $blogContentItems.forEach($contentItem => {
      let slider = $contentItem.querySelector('.blog-content__posts');
      let dataSlider;

      function mobileSlider() {
        if(document.documentElement.clientWidth < 992 && slider.dataset.mobile == 'false') {
          dataSlider = new Swiper(slider, {
            slidesPerView: 'auto',
            speed: 600,
            spaceBetween: 15,
            freeMode: true,
            observer: true,
            observeParents: true,
          });
  
          slider.dataset.mobile = 'true';
        }
  
        if(document.documentElement.clientWidth > 991.98) {
          slider.dataset.mobile = 'false';
  
          if(slider.classList.contains('swiper-container-initialized')) {
            dataSlider.destroy();
          }
        }
      }
  
      mobileSlider();
  
      window.addEventListener('resize', () => {
        mobileSlider();
      })



    })
  }



  function showCollapsePostsHandler() {
    if($blogContentItems.length) {
      $blogContentItems.forEach($contentItem => {
        let btn = $contentItem.querySelector('.blog-content__btn-collapse');
        let postsContainer = $contentItem.querySelector('.swiper-wrapper');
        let firstFourElements = Array.from(postsContainer.children).slice(0,4);
        let height = Math.max(...firstFourElements.map(i => i.querySelector('.card-post').clientHeight)) + 5;
        let scrollHeight = postsContainer.scrollHeight;
        let $tabsWrapper = document.querySelector('.blog-content__tabs-wrap');

        if(document.documentElement.clientWidth >= 992) {
          if(!$contentItem.classList.contains('open')) {
            postsContainer.style.height = height + 'px';
          }
        }


        if(!$contentItem.classList.contains('_events-click')) {
          btn.addEventListener('click', () => {
            if(document.documentElement.clientWidth >= 992) {
              if($contentItem.classList.contains('open')) {
                postsContainer.style.height = height + 'px';
                $contentItem.classList.remove('open')
                btn.innerText = 'View All';

                if($tabsWrapper) {
                  let count = 0;
                  let timerId = setInterval(() => {
                    if(count < 60) {
                      updeteObjHeight();
                      $tabsWrapper.style.height = objHeight[globalId] + 'px';
                      count++;
                    } else {
                      clearInterval(timerId);
                    }
                  },10)
                }

              } else {
                postsContainer.style.height = scrollHeight + 'px';
                $contentItem.classList.add('open')
                btn.innerText = 'View Less';

                if($tabsWrapper) {
                  let count = 0;
                  let timerId = setInterval(() => {
                    if(count < 60) {
                      updeteObjHeight();
                      $tabsWrapper.style.height = objHeight[globalId] + 'px';
                      count++;
                    } else {
                      clearInterval(timerId);
                    }
                  },10)
                }
              } 
            }
          })
          $contentItem.classList.add('_events-click');
        }
      })
    }
  }

  showCollapsePostsHandler()

  window.addEventListener('resize', showCollapsePostsHandler);

});


