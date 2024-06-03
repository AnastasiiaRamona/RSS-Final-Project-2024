import HTMLCreator from '../HTMLCreator';
import CatalogController from './catalogController';

interface Category {
  id: string;
  name: { 'en-US': string };
}
interface BreadcrumbsInfo {
  parentCategory: Category | null;
  category: Category;
}
interface CategoryNode {
  id: string;
  name: string;
  parent?: string;
  children: CategoryMap;
}
interface CategoryMap {
  [key: string]: CategoryNode;
}
export default class Catalog {
  controller: CatalogController;

  constructor() {
    this.controller = new CatalogController();
  }

  async renderPage() {
    let catalog: HTMLElement | null = null;
    let form: HTMLElement | null = null;
    let category: HTMLElement | null = null;
    const catalogWrapper = HTMLCreator.createElement('main', { class: 'catalog__main' }, [
      HTMLCreator.createElement('div', { class: 'catalog__wrapper' }, [
        HTMLCreator.createElement('section', { class: 'catalog__aside' }, [
          HTMLCreator.createElement(
            'div',
            {
              class: 'catalog__filter',
            },
            [
              HTMLCreator.createElement('form', { class: 'catalog__search' }, [
                HTMLCreator.createElement('label', { for: 'product-search', class: 'search__label' }, [
                  'Search the site:',
                ]),
                HTMLCreator.createElement('input', { type: 'search', id: 'product-search', class: 'search__input' }),
                HTMLCreator.createElement('button', { type: 'submit', class: 'search__button' }, ['Search']),
              ]),
              HTMLCreator.createElement('button', { class: 'catalog__reset-filter' }, ['Reset Filter']),
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
              (form = HTMLCreator.createElement('form', { id: 'filter__form', class: 'filter__form' })),
            ]
          ),
        ]),
        HTMLCreator.createElement('div', { class: 'breadcrumb' }),
        HTMLCreator.createElement('div', { class: 'core__wrapper' }, [
          (category = HTMLCreator.createElement('aside', { class: 'catalog__category' }, [
            HTMLCreator.createElement('h3', { class: 'category__title' }, ['Category']),
          ])),
          (catalog = HTMLCreator.createElement('section', {
            class: 'catalog__gallery',
          })),
        ]),
      ]),
    ]);
    await this.productView(catalog);
    await this.attributesView(form);
    await this.getCategory(category);
    return catalogWrapper;
  }

  addEventListeners() {
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    const resetFilter = document.querySelector('.catalog__reset-filter');
    const searchButton = document.querySelector('.search__button');
    const searchInput = document.querySelector('.search__input') as HTMLInputElement;
    const sortSelect = document.querySelector('.sorting__select') as HTMLSelectElement;
    const priceInputAll = document.querySelectorAll('.price__input') as NodeListOf<HTMLInputElement>;
    const categoryAll = document.querySelectorAll('.category__element') as NodeListOf<HTMLInputElement>;

    categoryAll.forEach((category) => {
      category.addEventListener('click', (event) => {
        this.showProductsOfCategory(event);
      });
    });

    checkboxAll.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.filter(checkboxAll, sortSelect, priceInputAll);
      });
    });
    resetFilter?.addEventListener('click', () => {
      this.controller.resetFilter(checkboxAll, sortSelect, priceInputAll);
      this.filter(checkboxAll, sortSelect, priceInputAll);
    });
    searchButton?.addEventListener('click', (event) => {
      this.search(event, searchInput);
    });
    sortSelect?.addEventListener('change', () => {
      this.filter(checkboxAll, sortSelect, priceInputAll);
    });
    priceInputAll.forEach((priceInput) => {
      priceInput.addEventListener('change', () => {
        this.filter(checkboxAll, sortSelect, priceInputAll);
      });
    });
  }

  async showProductsOfCategory(event: Event) {
    const productOfCategory = await this.controller.getProductsOfCategory(event);
    const sortSelect = document.querySelector('.sorting__select') as HTMLSelectElement;
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    const priceInputAll = document.querySelectorAll('.price__input') as NodeListOf<HTMLInputElement>;
    this.controller.resetFilter(checkboxAll, sortSelect, priceInputAll);
    if (productOfCategory && Array.isArray(productOfCategory)) {
      const catalog = document.querySelector('.catalog__gallery');
      if (catalog) {
        catalog.innerHTML = '';
        productOfCategory.forEach((product) => {
          const { id, name, description = '', imageUrl = '', price = 0, discountedPrice } = product;
          catalog.append(this.productCard(id, name, description, imageUrl, price, discountedPrice));
        });
      }
    }
    this.generateBreadcrumbs(event);
  }

  async getCategory(category: HTMLElement) {
    const categoryTree = await this.controller.getCategory();
    if (category) {
      const tree = this.createCategoryTree(categoryTree);
      category.appendChild(await tree);
    }
  }

  async createCategoryTree(categoryTree: CategoryMap) {
    const ul = HTMLCreator.createElement('ul', { class: 'category__list' });
    Object.values(categoryTree).forEach(async (category) => {
      const li = HTMLCreator.createElement('li', { id: category.id, class: 'category__element' }, [
        category.name,
      ]) as HTMLElement;
      if (Object.keys(category.children).length > 0) {
        li.appendChild(await this.createSubcategoryTree(category.children));
      }
      ul.appendChild(li);
    });
    return ul;
  }

  async createSubcategoryTree(subcategoryTree: CategoryMap) {
    const subUl = HTMLCreator.createElement('ul', { class: 'category__sub-list hide__sub-list' });
    Object.values(subcategoryTree).forEach(async (subCategory) => {
      const li = HTMLCreator.createElement('li', { id: subCategory.id, class: 'category__sub-element' }, [
        subCategory.name,
      ]) as HTMLElement;
      subUl.appendChild(li);
    });
    return subUl;
  }

  async generateBreadcrumbs(event: Event) {
    const checkboxAll = document.querySelectorAll('.checkbox__input') as NodeListOf<HTMLInputElement>;
    const sortSelect = document.querySelector('.sorting__select') as HTMLSelectElement;
    const priceInputAll = document.querySelectorAll('.price__input') as NodeListOf<HTMLInputElement>;

    const container = document.querySelector('.breadcrumb') as HTMLElement;
    container.innerHTML = '';
    const breadcrumbTitle = HTMLCreator.createElement('div', { class: 'breadcrumb__title breadcrumb__element' }, [
      '🛍️ Catalog',
    ]);
    breadcrumbTitle?.addEventListener('click', () => {
      this.controller.resetFilter(checkboxAll, sortSelect, priceInputAll);
      this.filter(checkboxAll, sortSelect, priceInputAll);
      container.innerHTML = '';
      container.append(breadcrumbTitle);
    });
    container.append(breadcrumbTitle);
    const breadcrumbsOfCategory = (await this.controller.getBreadcrumbsOfCategory(event)) as BreadcrumbsInfo;
    const breadCrumbsCategory = HTMLCreator.createElement(
      'div',
      { class: 'breadcrumbs__category breadcrumb__element', id: breadcrumbsOfCategory.category?.id },
      [`${breadcrumbsOfCategory.category?.name[`en-US`]}`]
    );
    breadCrumbsCategory.addEventListener('click', (eventBreadcrumbs) => {
      this.showProductsOfCategory(eventBreadcrumbs);
    });
    if (breadcrumbsOfCategory.parentCategory) {
      const breadCrumbsParentCategory = HTMLCreator.createElement(
        'div',
        { class: 'breadcrumbs__parent-category breadcrumb__element', id: breadcrumbsOfCategory.parentCategory.id },
        [`${breadcrumbsOfCategory.parentCategory?.name[`en-US`]}`]
      );
      breadCrumbsParentCategory.addEventListener('click', (eventBreadcrumbs) => {
        this.showProductsOfCategory(eventBreadcrumbs);
      });
      container.append(breadCrumbsParentCategory);
    }
    container.append(breadCrumbsCategory);
  }

  async filter(
    checkboxAll: NodeListOf<HTMLInputElement>,
    sortSelect: HTMLSelectElement,
    priceInputAll: NodeListOf<HTMLInputElement>
  ) {
    const filterProduct = await this.controller.checkboxChecked(checkboxAll, sortSelect, priceInputAll);
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
    const priceInputAll = document.querySelectorAll('.price__input') as NodeListOf<HTMLInputElement>;
    this.controller.resetFilter(checkboxAll, sortSelect, priceInputAll);
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
    const minPrice = (Number(attributes.minPrice[0]) / 100).toFixed(0);
    const maxPrice = (Number(attributes.maxPrice[0]) / 100).toFixed(0);
    const price = HTMLCreator.createElement('div', { class: 'checkbox__price' }, [
      HTMLCreator.createElement('div', { class: 'checkbox__price-min' }, [
        HTMLCreator.createElement('span', { class: 'price__span', type: 'range', id: 'min-price' }, ['Minimum Price']),
        HTMLCreator.createElement('input', {
          type: 'number',
          value: `${minPrice}`,
          class: 'price__input',
          id: 'min-price',
          step: '1',
          max: maxPrice,
          min: minPrice,
        }),
      ]),
      HTMLCreator.createElement('div', { class: 'checkbox__price-min' }, [
        HTMLCreator.createElement('span', { class: 'price__span', type: 'range', id: 'max-price' }, ['Maximum Price']),
        HTMLCreator.createElement('input', {
          type: 'number',
          value: `${maxPrice}`,
          class: 'price__input',
          id: 'max-price',
          step: '1',
          max: maxPrice,
          min: minPrice,
        }),
      ]),
    ]);
    container.appendChild(price);
    Object.keys(attributes).forEach((key) => {
      if (key !== 'minPrice' && key !== 'maxPrice') {
        const div = HTMLCreator.createElement('div', { class: `${key} checkbox__element` }) as HTMLElement;
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
      }
    });
    return container;
  }
}
