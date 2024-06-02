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
    function removeDuplicates(obj: { [key: string]: (string | number)[] }) {
      const result: { [key: string]: string[] } = {};
      Object.keys(obj).forEach((key) => {
        const uniqueArray = [...new Set(obj[key])];
        result[key] = uniqueArray.map(String);
      });
      return result;
    }
    const uniqueAttributes = removeDuplicates(attributes);
    return uniqueAttributes;
  }

  async checkboxChecked(
    checkboxChecked: { [key: string]: string[] },
    sorting: string,
    minPrice: string,
    maxPrice: string
  ) {
    const sortingApi = sorting;
    const filter = await this.commerceToolsAPI.filter(checkboxChecked, sortingApi, minPrice, maxPrice);
    return filter;
  }

  async search(text: string) {
    const search = await this.commerceToolsAPI.search(text);
    return search;
  }
}
