import HTMLCreator from '../HTMLCreator';
import CatalogController from './catalogController';

export default class Catalog {
  controller: CatalogController;

  constructor() {
    this.controller = new CatalogController();
  }

  async renderPage() {
    let catalog: HTMLElement | null = null;
    let form: HTMLElement | null = null;
    const loginWrapper = HTMLCreator.createElement('main', { class: 'catalog__main' }, [
      HTMLCreator.createElement('aside', { class: 'catalog__aside' }, [
        HTMLCreator.createElement(
          'div',
          {
            class: 'catalog__filter',
          },
          [
            HTMLCreator.createElement('form', { class: 'catalog__sorting' }, [
              HTMLCreator.createElement('label', { for: 'catalog__sorting', class: 'sorting__label' }, ['Sort']),
              HTMLCreator.createElement(
                'select',
                { name: 'sort-param', id: 'catalog__sorting', class: 'sorting__select' },
                [
                  HTMLCreator.createElement('option', { value: '' }, ['--sorting--']),
                  HTMLCreator.createElement('option', { value: 'price desc' }, ['by descending price']),
                  HTMLCreator.createElement('option', { value: 'price asc' }, ['by ascending price']),
                  HTMLCreator.createElement('option', { value: 'name.en-US asc' }, ['by name']),
                ]
              ),
            ]),
            HTMLCreator.createElement('form', { class: 'catalog__search' }, [
              HTMLCreator.createElement('label', { for: 'product-search', class: 'search__label' }, [
                'Search the site:',
              ]),
              HTMLCreator.createElement('input', { type: 'search', id: 'product-search', class: 'search__input' }, [
                'Reset Filter',
              ]),
              HTMLCreator.createElement('button', { type: 'submit', class: 'search__button' }, ['Search']),
            ]),
            HTMLCreator.createElement('button', { class: 'catalog__reset-filter' }, ['Reset Filter']),
            (form = HTMLCreator.createElement('form', { id: 'filter__form', class: 'filter__form' })),
          ]
        ),
      ]),
      (catalog = HTMLCreator.createElement('section', {
        class: 'catalog__gallery',
      })),
    ]);
    await this.productView(catalog);
    await this.attributesView(form);
    return loginWrapper;
  }

  addEventListeners() {
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    const resetFilter = document.querySelector('.catalog__reset-filter');
    const searchButton = document.querySelector('.search__button');
    const searchInput = document.querySelector('.search__input') as HTMLInputElement;
    const sortSelect = document.querySelector('.sorting__select') as HTMLSelectElement;

    checkboxAll.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.filter(checkboxAll, sortSelect);
      });
    });
    resetFilter?.addEventListener('click', () => {
      this.controller.resetFilter(checkboxAll, sortSelect);
      this.filter(checkboxAll, sortSelect);
    });
    searchButton?.addEventListener('click', (event) => {
      this.search(event, searchInput);
    });
    sortSelect?.addEventListener('change', () => {
      this.filter(checkboxAll, sortSelect);
    });
  }

  async filter(checkboxAll: NodeListOf<HTMLInputElement>, sortSelect: HTMLSelectElement) {
    const filterProduct = await this.controller.checkboxChecked(checkboxAll, sortSelect);
    if (filterProduct && Array.isArray(filterProduct)) {
      const catalog = document.querySelector('.catalog__gallery');
      if (catalog) {
        catalog.innerHTML = '';
        filterProduct.forEach((product) => {
          const { id, name, description = '', imageUrl = '', price = 0, discountedPrice } = product;
          catalog.append(this.productCard(id, name, description, imageUrl, price, discountedPrice));
        });
      }
    }
  }

  async search(event: Event, searchInput: HTMLInputElement) {
    const searchProduct = await this.controller.search(event, searchInput);
    const sortSelect = document.querySelector('.sorting__select') as HTMLSelectElement;
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    this.controller.resetFilter(checkboxAll, sortSelect);
    if (searchProduct && Array.isArray(searchProduct)) {
      const catalog = document.querySelector('.catalog__gallery');
      if (catalog) {
        catalog.innerHTML = '';
        searchProduct.forEach((product) => {
          const { id, name, description = '', imageUrl = '', price = 0, discountedPrice } = product;
          catalog.append(this.productCard(id, name, description, imageUrl, price, discountedPrice));
        });
      }
    }
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
    const prices = [HTMLCreator.createElement('div', { class: priceClasses }, [`${(price / 100).toFixed(2)} €`])];

    if (discountedPrice != null) {
      prices.push(
        HTMLCreator.createElement('div', { class: 'product-card__price-discount' }, [
          `${(discountedPrice / 100).toFixed(2)} €`,
        ])
      );
    }
    const productCard = HTMLCreator.createElement('div', { class: 'product-card', id }, [
      HTMLCreator.createElement('div', { class: 'product-card__box' }, [
        HTMLCreator.createElement('img', { class: 'product-card__img', src: img, alt: `image ${name} product` }),
      ]),
      HTMLCreator.createElement('div', { class: 'product-card__title' }, [
        HTMLCreator.createElement('h3', { class: 'product-card__name' }, [name]),
        HTMLCreator.createElement('p', { class: 'product-card__description' }, [description]),
        HTMLCreator.createElement('div', { class: 'product-card__prices' }, prices),
      ]),
    ]);
    return productCard;
  }

  async attributesView(form: HTMLElement) {
    const attributes = await this.controller.getAttributes();
    form.append(this.checboxBultd(attributes));
  }

  checboxBultd(attributes: { [key: string]: string[] }): HTMLElement {
    const container = HTMLCreator.createElement('div', { class: 'checkbox__container' }) as HTMLElement;

    Object.keys(attributes).forEach((key) => {
      const div = HTMLCreator.createElement('div', { class: key }) as HTMLElement;
      const header = HTMLCreator.createElement('h3', { class: key }, [key]) as HTMLElement;
      attributes[key].forEach((value) => {
        const checkbox = HTMLCreator.createElement('input', {
          type: 'checkbox',
          class: 'checkbox__input',
          id: `${key}`,
          value,
        }) as HTMLInputElement;
        const label = HTMLCreator.createElement('label', {}, [value]) as HTMLElement;
        const checkboxContainer = HTMLCreator.createElement('div', {}, [checkbox, label]) as HTMLElement;
        div.appendChild(checkboxContainer);
      });
      div.insertBefore(header, div.firstChild);
      container.appendChild(div);
    });
    return container;
  }
}
