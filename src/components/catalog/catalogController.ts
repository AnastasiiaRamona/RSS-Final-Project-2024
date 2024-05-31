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

  checkboxChecked(checkboxAll: NodeListOf<HTMLInputElement>, sortSelect: HTMLSelectElement) {
    const checkboxChecked: { [key: string]: string[] } = {};
    const sorting = sortSelect.value;
    let result;
    checkboxAll.forEach((checkbox) => {
      if (checkbox.checked) {
        if (checkboxChecked[checkbox.id]) {
          checkboxChecked[checkbox.id].push(checkbox.value);
        } else {
          checkboxChecked[checkbox.id] = [checkbox.value];
        }
      }
    });
    if (Object.keys(checkboxChecked).length === 0 && !sorting) {
      result = this.model.getProducts();
    } else {
      result = this.model.checkboxChecked(checkboxChecked, sorting);
    }
    return result;
  }

  resetFilter(checkboxAll: NodeListOf<HTMLInputElement>, sortSelect: HTMLSelectElement) {
    checkboxAll.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        const tempCheckbox = checkbox;
        tempCheckbox.checked = false;
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
}
