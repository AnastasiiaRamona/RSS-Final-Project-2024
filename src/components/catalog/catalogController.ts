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
}
