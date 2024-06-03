import CatalogModel from './catalogModel';

export default class CatalogController {
  model: CatalogModel;

  constructor() {
    this.model = new CatalogModel();
  }

  async getProducts() {
    const result = await this.model.getProducts();
    return result;
  }

  async getAttributes() {
    const attribute = await this.model.getAttributes();
    return attribute;
  }

  checkboxChecked(
    checkboxAll: NodeListOf<HTMLInputElement>,
    sortSelect: HTMLSelectElement,
    priceInputAll: NodeListOf<HTMLInputElement>
  ) {
    const checkboxChecked: { [key: string]: string[] } = {};
    const sorting = sortSelect.value;
    let minPrice: string = '';
    let maxPrice: string = '';
    priceInputAll.forEach((input) => {
      if (input.id === 'min-price') {
        minPrice = (Number(input.value) * 100).toString();
      } else if (input.id === 'max-price') {
        maxPrice = (Number(input.value) * 100).toString();
      }
    });
    checkboxAll.forEach((checkbox) => {
      if (checkbox.checked) {
        if (checkboxChecked[checkbox.id]) {
          checkboxChecked[checkbox.id].push(checkbox.value);
        } else {
          checkboxChecked[checkbox.id] = [checkbox.value];
        }
      }
    });
    const result = this.model.checkboxChecked(checkboxChecked, sorting, minPrice, maxPrice);
    return result;
  }

  resetFilter(
    checkboxAll: NodeListOf<HTMLInputElement>,
    sortSelect: HTMLSelectElement,
    priceInputAll: NodeListOf<HTMLInputElement>
  ) {
    checkboxAll.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        const tempCheckbox = checkbox;
        tempCheckbox.checked = false;
      }
    });
    priceInputAll.forEach((input) => {
      const tempInput = input;
      if (input.id === 'min-price') {
        tempInput.value = input.min;
      } else if (input.id === 'max-price') {
        tempInput.value = input.max;
      }
    });
    const tempSelect = sortSelect;
    tempSelect.selectedIndex = 0;
  }

  search(event: Event, input: HTMLInputElement) {
    event.preventDefault();
    const text = input.value;
    const result = this.model.search(text);
    return result;
  }

  async getCategory() {
    const categories = await this.model.getCategory();
    return categories;
  }

  async getProductsOfCategory(event: Event) {
    const category = event.target as HTMLElement;
    const categoryId = category.id;
    if (categoryId.length <= 1) {
      throw new Error('Invalid category ID');
    }
    const productOfCategory = this.model.getProductsOfCategory(categoryId);
    return productOfCategory;
  }

  async getBreadcrumbsOfCategory(event: Event) {
    const category = event.target as HTMLElement;
    const categoryId = category.id;
    if (categoryId.length <= 1) {
      throw new Error('Invalid category ID');
    }
    const productOfCategory = this.model.getBreadcrumbsOfCategory(categoryId);
    return productOfCategory;
  }
}
