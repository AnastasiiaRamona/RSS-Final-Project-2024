import { Fancybox } from '@fancyapps/ui';
import Swiper from 'swiper';
import AppSwiper from '../components/app/swiper';

// Mock the Swiper class and its methods
jest.mock('swiper', () =>
  jest.fn().mockImplementation(() => ({
    params: {},
    init: jest.fn(),
    slideNext: jest.fn(),
    slidePrev: jest.fn(),
  }))
);

// Mock the Swiper modules
jest.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Zoom: {},
}));

// Mock Fancybox
jest.mock('@fancyapps/ui', () => ({
  Fancybox: {
    bind: jest.fn(),
  },
}));

describe('AppSwiper', () => {
  let appSwiper: AppSwiper;

  beforeEach(() => {
    appSwiper = new AppSwiper();
    document.body.innerHTML = `
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    `;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize Swiper with correct parameters', () => {
    appSwiper.createSwiper();

    expect(Swiper).toHaveBeenCalledWith('.swiper', {
      modules: [expect.any(Object), expect.any(Object), expect.any(Object)],
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

  test('should bind Fancybox correctly', () => {
    appSwiper.createSwiper();

    expect(Fancybox.bind).toHaveBeenCalledWith('[data-fancybox]', {});
  });

  test('should return Swiper instance', () => {
    const swiperInstance = appSwiper.createSwiper();
    expect(swiperInstance).toBeInstanceOf(Object);
  });
});
