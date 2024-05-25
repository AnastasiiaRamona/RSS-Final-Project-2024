import DetailedProductModel from './detailedProductModel';

export default class DetailedProductController {
  model: DetailedProductModel;

  constructor() {
    this.model = new DetailedProductModel();
  }

  async getProductByID(id: string) {
    const result = await this.model.getProductByID(id);
    return result;
  }
}
