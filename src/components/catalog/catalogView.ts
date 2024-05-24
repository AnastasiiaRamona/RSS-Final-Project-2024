import HTMLCreation from '../HTMLCreation';
import CatalogController from './catalogController';

export default class Catalog {
  controller: CatalogController;

  constructor() {
    this.controller = new CatalogController();
  }

  async renderPage() {
    let catalog: HTMLElement | null = null;
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
      (catalog = HTMLCreation.createElement('section', {
        class: 'catalog__gallery',
      })),
    ]);
    await this.productView(catalog);
    await this.attributesView();
    return loginWrapper;
  }

  addEventListeners() {}

  async productView(catalog: HTMLElement) {
    const products = await this.controller.getProducts();
    products.forEach((product) => {
      catalog.append(
        this.productCard(
          product.id,
          product.name,
          product.description,
          product.imageUrl,
          product.price,
          product.discountedPrice
        )
      );
    });
  }

  productCard(id: string, name: string, description: string, img: string, price: number, discountedPrice?: number) {
    const priceClasses =
      discountedPrice != null ? 'product-card__price product-card__price-discounted' : 'product-card__price';
    const prices = [HTMLCreation.createElement('div', { class: priceClasses }, [`${(price / 100).toFixed(2)} €`])];

    if (discountedPrice != null) {
      prices.push(
        HTMLCreation.createElement('div', { class: 'product-card__price-discount' }, [
          `${(discountedPrice / 100).toFixed(2)} €`,
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

  async attributesView() {
    const attributes = await this.controller.getAttributes();
    console.log(attributes);
  }
}
