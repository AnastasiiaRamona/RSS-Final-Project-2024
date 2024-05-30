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

  checkboxChecked(checkboxAll: NodeListOf<HTMLInputElement>) {
    const checkboxChecked: { [key: string]: string[] } = {};
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
    if (Object.keys(checkboxChecked).length === 0) {
      result = this.model.getProducts();
    } else {
      result = this.model.checkboxChecked(checkboxChecked);
    }
    return result;
  }

  resetFilter(checkboxAll: NodeListOf<HTMLInputElement>) {
    checkboxAll.forEach((checkbox) => {
      if (checkbox instanceof HTMLInputElement) {
        const tempCheckbox = checkbox;
        tempCheckbox.checked = false;
      }
    });
  }

  search(event: Event, input: HTMLInputElement) {
    event.preventDefault();
    const text = input.value;
    console.log(text);
    // const result = this.model.search(text);
  }
}
