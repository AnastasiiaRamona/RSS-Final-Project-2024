import HTMLCreator from '../HTMLCreator';
// import slider1 from '../../assets/slider-1.jpg';
// import slider2 from '../../assets/slider-2.jpg';
// import slider3 from '../../assets/slider-3.jpg';
// import slider4 from '../../assets/slider-4.jpg';
// import slider5 from '../../assets/slider-5.jpg';
// import slider6 from '../../assets/slider-6.jpg';
import DetailedProductController from './detailedProductController';

export default class DetailedProduct {
  controller: DetailedProductController;

  id: string;

  constructor(id: string) {
    this.controller = new DetailedProductController();
    this.id = id;
  }

  renderMain() {
    const detailedProductWrapper = HTMLCreator.createElement('div', { class: 'detailed__product-wrapper' });
    const main = HTMLCreator.createElement('main', { class: 'detailed__product' }, [
      HTMLCreator.createElement('div', { class: 'detailed__product-container' }, [detailedProductWrapper]),
    ]);

    const swiper = HTMLCreator.createElement('div', { class: 'swiper' }, [
      HTMLCreator.createElement('div', { class: 'swiper-wrapper' }),
      HTMLCreator.createElement('div', { class: 'swiper-pagination' }),
      HTMLCreator.createElement('div', { class: 'swiper-button-prev' }),
      HTMLCreator.createElement('div', { class: 'swiper-button-next' }),
    ]);

    const productContent = HTMLCreator.createElement('div', { class: 'detailed__product-content' }, [
      HTMLCreator.createElement('h1', { class: 'detailed__product-title' }),
      HTMLCreator.createElement('p', { class: 'detailed__product-description' }),
      HTMLCreator.createElement('div', { class: 'detailed__product-price' }),
      HTMLCreator.createElement('div', { class: 'detailed__product-discount' }),
      HTMLCreator.createElement('button', { class: 'detailed__product-basket' }, ['Add to Basket']),
    ]);

    detailedProductWrapper.appendChild(swiper);
    detailedProductWrapper.appendChild(productContent);

    return main;
  }

  async getProductInformation() {
    const result = await this.controller.getProductByID(this.id);
    if (result) {
      const productData = {
        name: result.body.masterData.current.name['en-US'],
        description: result.body.masterData.current.description?.['en-US'],
        images: result.body.masterData.current.masterVariant.images?.map((image) => image.url),
        price: result.body.masterData.current.masterVariant.prices?.[0]?.value.centAmount,
        discountedPrice: result.body.masterData.current.masterVariant.prices?.[0]?.discounted?.value.centAmount,
      };
      console.log(result);
      if (productData.description && productData.price) {
        this.controller.renderProductInfo(productData.name, productData.description, productData.price);
      }
      if (productData.images) {
        this.controller.renderSlideImages(productData.images);
      }
    }
  }
}
