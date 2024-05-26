import DetailedProductModel from './detailedProductModel';
import HTMLCreator from '../HTMLCreator';

export default class DetailedProductController {
  model: DetailedProductModel;

  constructor() {
    this.model = new DetailedProductModel();
  }

  async getProductByID(id: string) {
    const result = await this.model.getProductByID(id);
    return result;
  }

  renderProductInfo(title: string, description: string, price: number) {
    const titleProduct = document.querySelector('.detailed__product-title') as HTMLElement;
    const descriptionProduct = document.querySelector('.detailed__product-description') as HTMLElement;
    const priceProduct = document.querySelector('.detailed__product-price') as HTMLElement;
    if (titleProduct) {
      titleProduct.textContent = title;
    }
    if (descriptionProduct) {
      descriptionProduct.textContent = description;
    }
    if (priceProduct) {
      priceProduct.textContent = `${price}`;
    }
  }

  renderSlideImages(images: string[]) {
    const sliderWrapper = document.querySelector('.swiper-wrapper');
    images.forEach((item) => {
      if (sliderWrapper) {
        sliderWrapper.appendChild(
          HTMLCreator.createElement('picture', { class: 'swiper-slide', lazy: 'true' }, [
            HTMLCreator.createElement('img', { src: item, alt: 'img', loading: 'lazy', 'data-fancybox': 'gallery' }),
          ])
        );
      }
    });
  }
}
