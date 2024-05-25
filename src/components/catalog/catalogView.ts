import HTMLCreation from '../HTMLCreation';
import CatalogController from './catalogController';

export default class Catalog {
  controller: CatalogController;

  constructor() {
    this.controller = new CatalogController();
  }

  async renderPage() {
    let catalog: HTMLElement | null = null;
    let form: HTMLElement | null = null;
    const loginWrapper = HTMLCreation.createElement('main', { class: 'catalog__main' }, [
      HTMLCreation.createElement('aside', { class: 'catalog__aside' }, [
        HTMLCreation.createElement(
          'div',
          {
            class: 'catalog__filter',
          },
          [(form = HTMLCreation.createElement('form', { id: 'filter__form', class: 'filter__form' }))]
        ),
      ]),
      (catalog = HTMLCreation.createElement('section', {
        class: 'catalog__gallery',
      })),
    ]);
    await this.productView(catalog);
    await this.attributesView(form);
    return loginWrapper;
  }

  addEventListeners() {
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    checkboxAll.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.controller.checkbox(checkboxAll);
      });
    });
  }

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

  async attributesView(form: HTMLElement) {
    const attributes = await this.controller.getAttributes();
    form.append(this.checbox(attributes));
  }

  checbox(attributes: { [key: string]: string[] }): HTMLElement {
    const container = HTMLCreation.createElement('div', { class: 'checkbox__container' }) as HTMLElement;

    Object.keys(attributes).forEach((key) => {
      const div = HTMLCreation.createElement('div', { class: key }) as HTMLElement;
      const header = HTMLCreation.createElement('h3', { class: key }, [key]) as HTMLElement;

      attributes[key].forEach((value) => {
        const checkbox = HTMLCreation.createElement('input', {
          type: 'checkbox',
          class: 'checkbox__input',
          id: `${key}`,
          value,
        }) as HTMLInputElement;
        const label = HTMLCreation.createElement('label', {}, [value]) as HTMLElement;
        const checkboxContainer = HTMLCreation.createElement('div', {}, [checkbox, label]) as HTMLElement;
        div.appendChild(checkboxContainer);
      });

      div.insertBefore(header, div.firstChild); // Insert the header as the first child of the div
      container.appendChild(div);
    });

    return container;
  }
}
