import { Fancybox } from '@fancyapps/ui';
import Swiper from 'swiper';
import { Navigation, Pagination, Zoom } from 'swiper/modules';

export default class AppSwiper {
  createSwiper() {
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

    Fancybox.bind('[data-fancybox]', {
      // Your custom options
    });

    return swiper;
  }
}
