import CommerceToolsAPI from '../commerceToolsAPI';

export default class CatalogModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getProducts() {
    const products = (await this.commerceToolsAPI.getProducts()) as unknown as [
      {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        price: number;
        discountedPrice: number;
      },
    ];
    return products;
  }

  async getAttributes() {
    const attributes = await this.commerceToolsAPI.getAttributes();
    return attributes;
  }
}
