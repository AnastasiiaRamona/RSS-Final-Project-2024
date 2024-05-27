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

  checkbox(checkboxAll: NodeListOf<HTMLInputElement>) {
    const checkboxChecked: { [key: string]: string[] } = {};
    checkboxAll.forEach((checkbox) => {
      if (checkbox.checked) {
        if (checkboxChecked[checkbox.id]) {
          checkboxChecked[checkbox.id].push(checkbox.value);
        } else {
          checkboxChecked[checkbox.id] = [checkbox.value];
        }
      }
    });
    return checkboxChecked;
  }

  async filter() {
    const filter = await this.model.filter();
    return filter;
  }
}
