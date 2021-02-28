"use strict";

// const { default: Swiper } = require("swiper");
var wrapper = document.querySelector('.wrapper');
var swiper = new Swiper('.page', {
  wrapperClass: 'page__wrapper',
  slideClass: 'page__screen',
  direction: 'vertical',
  slidesPerView: 'auto',
  parallax: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true
  },
  mousewheel: {
    sensitivity: 1
  },
  watchOverflow: true,
  speed: 800,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active'
  },
  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true
  },
  init: false,
  on: {
    init: function init() {
      menuSlider();
      setScrollType();
      wrapper.classList.add('_loaded');
    },
    slideChange: function slideChange() {
      menuSliderRemove();
      menuLinks[swiper.realIndex].classList.add('_active');
    },
    resize: function resize() {
      setScrollType();
    }
  }
});
var portfolioSlider = new Swiper('.portfolio-slide', {
  wrapperClass: 'portfolio-items',
  slideClass: 'portfolio-item',
  spaceBetween: 10,
  slidesPerView: 3,
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    425: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});
var menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[swiper.realIndex].classList.add('_active');

    var _loop = function _loop(index) {
      var menuLink = menuLinks[index];
      menuLink.addEventListener('click', function (e) {
        menuSliderRemove();
        swiper.slideTo(index, 800);
        menuLink.classList.add('_active');
        e.preventDefault();
      });
    };

    for (var index = 0; index < menuLinks.length; index++) {
      _loop(index);
    }
  }
}

function menuSliderRemove() {
  var link = document.querySelector('.menu__link._active');

  if (link) {
    link.classList.remove('_active');
  }
}

function setScrollType() {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free');
    swiper.params.freeMode = false;
  }

  for (var index = 0; index < swiper.slides.length; index++) {
    var element = swiper.slides[index];
    var pageSlideContent = document.querySelector('.screen__content');

    if (pageSlideContent) {
      var pageSlideContentHeight = pageSlideContent.offsetHeight;

      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free');
        swiper.params.freeMode = true;
        break;
      }
    }
  }
}

swiper.init();
portfolioSlider.init();