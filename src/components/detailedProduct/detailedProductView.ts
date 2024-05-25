import HTMLCreator from '../HTMLCreator';
import slider1 from '../../assets/slider-1.jpg';
import slider2 from '../../assets/slider-2.jpg';
import slider3 from '../../assets/slider-3.jpg';
import slider4 from '../../assets/slider-4.jpg';
import slider5 from '../../assets/slider-5.jpg';
import slider6 from '../../assets/slider-6.jpg';
import DetailedProductController from './detailedProductController';

export default class DetailedProduct {
  controller: DetailedProductController;

  name: string | null = null;

  price: string | null = null;

  discountPrice: string | null = null;

  descriptionOfProduct: string | null = null;

  constructor() {
    this.controller = new DetailedProductController();
  }

  renderMain() {
    const detailedProductWrapper = HTMLCreator.createElement('div', { class: 'detailed__product-wrapper' });
    const main = HTMLCreator.createElement('main', { class: 'detailed__product' }, [
      HTMLCreator.createElement('div', { class: 'detailed__product-container' }, [detailedProductWrapper]),
    ]);

    const createSwiperSlide = (src: 'string') =>
      HTMLCreator.createElement('picture', { class: 'swiper-slide', lazy: 'true' }, [
        HTMLCreator.createElement('img', { src, alt: 'img', loading: 'lazy', 'data-fancybox': 'gallery' }),
      ]);

    const swiperWrapper = HTMLCreator.createElement('div', { class: 'swiper-wrapper' }, [
      createSwiperSlide(slider1),
      createSwiperSlide(slider2),
      createSwiperSlide(slider3),
      createSwiperSlide(slider4),
      createSwiperSlide(slider5),
      createSwiperSlide(slider6),
    ]);

    const swiper = HTMLCreator.createElement('div', { class: 'swiper' }, [
      swiperWrapper,
      HTMLCreator.createElement('div', { class: 'swiper-pagination' }),
      HTMLCreator.createElement('div', { class: 'swiper-button-prev' }),
      HTMLCreator.createElement('div', { class: 'swiper-button-next' }),
    ]);

    const productContent = HTMLCreator.createElement('div', { class: 'detailed__product-content' }, [
      HTMLCreator.createElement('h1', { class: 'detailed__product-title' }, [this.name]),
      HTMLCreator.createElement('p', { class: 'detailed__product-description' }, [this.descriptionOfProduct]),
      HTMLCreator.createElement('div', { class: 'detailed__product-price' }, [this.price]),
      HTMLCreator.createElement('div', { class: 'detailed__product-discount' }, [this.discountPrice]),
      HTMLCreator.createElement('button', { class: 'detailed__product-basket' }, ['Add to Basket']),
    ]);

    detailedProductWrapper.appendChild(swiper);
    detailedProductWrapper.appendChild(productContent);

    return main;
  }

  async getProductInformation() {
    const result = await this.controller.getProductByID('c4734136-b505-4157-b12f-ee1e1fcfe9a0');
    if (result) {
      const productData = {
        name: result.body.masterData.current.name['en-US'],
        description: result.body.masterData.current.description?.['en-US'],
        images: result.body.masterData.current.masterVariant.images?.map((image) => image.url),
        price: result.body.masterData.current.masterVariant.prices?.[0]?.value.centAmount,
        discountedPrice: result.body.masterData.current.masterVariant.prices?.[0]?.discounted?.value.centAmount,
      };
      console.log(productData);
    }
  }
}
