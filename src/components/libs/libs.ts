/* eslint-disable @typescript-eslint/no-unused-vars */
import Swiper from 'swiper';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import { Fancybox } from '@fancyapps/ui';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination, Zoom],
    grabCursor: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

Fancybox.bind('[data-fancybox]', {
  // Your custom options
});