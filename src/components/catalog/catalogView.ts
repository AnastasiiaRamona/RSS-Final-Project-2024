import HTMLCreation from '../HTMLCreation';
import CatalogController from './catalogController';

export default class Catalog {
  controller: CatalogController;

  constructor() {
    this.controller = new CatalogController();
  }

  renderPage() {
    const loginWrapper = HTMLCreation.createElement('main', { class: 'catalog__main' }, [
      HTMLCreation.createElement('aside', { class: 'catalog__aside' }, [
        HTMLCreation.createElement(
          'div',
          {
            class: 'catalog__filter',
          },
          ['Filter']
        ),
      ]),
      HTMLCreation.createElement('section', {
        class: 'catalog__gallery',
      }),
    ]);
    const body = document.querySelector('body');
    body?.append(loginWrapper);
    this.productView();
    return loginWrapper;
  }

  addEventListeners() {}

  async productView() {
    const catalog = document.querySelector('.catalog__gallery');
    const products = await this.controller.getProducts();
    products.forEach((product) => {
      catalog?.append(
        this.productCard(
          product.id,
          product.name,
          product.description,
          product.imageUrl,
          product.price,
          product.discontedPrice
        )
      );
    });
  }

  productCard(id: string, name: string, description: string, img: string, price: number, discontedPrice?: number) {
    const priceClasses =
      discontedPrice != null ? 'product-card__price product-card__price--discounted' : 'product-card__price';
    const prices = [HTMLCreation.createElement('div', { class: priceClasses }, [`${(price / 100).toFixed(2)} €`])];

    if (discontedPrice != null) {
      prices.push(
        HTMLCreation.createElement('div', { class: 'product-card__price-discount' }, [
          `${(discontedPrice / 100).toFixed(2)} €`,
        ])
      );
    }
    const productCard = HTMLCreation.createElement('div', { class: 'product-card', id }, [
      HTMLCreation.createElement('div', { class: 'product-card__box' }, [
        HTMLCreation.createElement('img', { class: 'product-card__img', src: img, alt: `image ${name} product` }),
      ]),
      HTMLCreation.createElement('div', { class: 'product-card__title' }, [
        HTMLCreation.createElement('h3', { class: 'product-card__name' }, [name]),
        HTMLCreation.createElement('p', { class: 'product-card__description' }, [description]),
        HTMLCreation.createElement('div', { class: 'product-card__prices' }, prices),
      ]),
    ]);
    return productCard;
  }
}
