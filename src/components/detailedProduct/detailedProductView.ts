import HTMLCreation from '../HTMLCreation';
import Main from '../main/mainView';
import Header from '../header/headerView';
import Footer from '../footer/footerView';

import '../libs/libs';
import slider1 from '../../assets/slider-1.jpg';
import slider2 from '../../assets/slider-2.jpg';
import slider3 from '../../assets/slider-3.jpg';
import slider4 from '../../assets/slider-4.jpg';
import slider5 from '../../assets/slider-5.jpg';
import slider6 from '../../assets/slider-6.jpg';

export default class DetailedProductPage {
  header = new Header().renderHeader(false);

  main = new Main().renderPage();

  footer = new Footer().renderFooter();

  name: string = 'Product';

  price: string = 'Price';

  discountPrice: string = 'Discount Price';

  descriptionOfProduct: string = 'Description';

  renderMain() {
    const { body } = document;
    const main = HTMLCreation.createElement('main', { class: 'detailed__product' }, [
      HTMLCreation.createElement('div', { class: 'detailed__product-container' }, [
        HTMLCreation.createElement('div', { class: 'detailed__product-wrapper' }),
      ]),
    ]);
    body.appendChild(this.header);
    body.appendChild(main);
    body.appendChild(this.footer);

    const createSwiperSlide = (src: 'string') =>
      HTMLCreation.createElement('picture', { class: 'swiper-slide', lazy: 'true' }, [
        HTMLCreation.createElement('img', { src, alt: 'img', loading: 'lazy', 'data-fancybox': 'gallery' }),
      ]);

    const swiperWrapper = HTMLCreation.createElement('div', { class: 'swiper-wrapper' }, [
      createSwiperSlide(slider1),
      createSwiperSlide(slider2),
      createSwiperSlide(slider3),
      createSwiperSlide(slider4),
      createSwiperSlide(slider5),
      createSwiperSlide(slider6),
    ]);

    const swiper = HTMLCreation.createElement('div', { class: 'swiper' }, [
      swiperWrapper,
      HTMLCreation.createElement('div', { class: 'swiper-pagination' }),
      HTMLCreation.createElement('div', { class: 'swiper-button-prev' }),
      HTMLCreation.createElement('div', { class: 'swiper-button-next' }),
    ]);

    const productContent = HTMLCreation.createElement('div', { class: 'detailed__product-content' }, [
      HTMLCreation.createElement('h1', { class: 'detailed__product-title' }, [this.name]),
      HTMLCreation.createElement('p', { class: 'detailed__product-description' }, [this.descriptionOfProduct]),
      HTMLCreation.createElement('div', { class: 'detailed__product-price' }, [this.price]),
      HTMLCreation.createElement('div', { class: 'detailed__product-discount' }, [this.discountPrice]),
      HTMLCreation.createElement('button', { class: 'detailed__product-basket' }, ['Add to Basket']),
    ]);

    document.querySelector('.detailed__product-wrapper')?.insertAdjacentElement('afterbegin', swiper);
    document.querySelector('.detailed__product-wrapper')?.insertAdjacentElement('beforeend', productContent);
  }
}

const test = new DetailedProductPage();
test.renderMain();
