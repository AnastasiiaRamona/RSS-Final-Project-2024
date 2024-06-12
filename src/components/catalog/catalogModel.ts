import CommerceToolsAPI from '../commerceToolsAPI';

export default class CatalogModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getProducts(page: number, limitPage: number) {
    const products = (await this.commerceToolsAPI.getProducts(page, limitPage)) as unknown as [
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
    maxPrice: string,
    page?: number,
    limitPage?: number
  ) {
    const sortingApi = sorting;
    const filter = await this.commerceToolsAPI.filter(checkboxChecked, sortingApi, minPrice, maxPrice, page, limitPage);
    return filter;
  }

  async search(text: string) {
    const search = await this.commerceToolsAPI.search(text);
    return search;
  }

  async getCategory() {
    interface Category {
      id: string;
      name: { [key: string]: string };
      parent?: { id: string };
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

    const categories: Category[] = (await this.commerceToolsAPI.getCategory()) || [];
    const categoryTree: CategoryMap = {};
    const categoryMap: CategoryMap = {};

    categories.forEach((category: Category) => {
      categoryMap[category.id] = {
        id: category.id,
        name: category.name[`en-US`],
        parent: category.parent?.id,
        children: {},
      };
    });
    Object.values(categoryMap).forEach((category) => {
      if (category.parent) {
        if (!categoryMap[category.parent]) {
          categoryMap[category.parent] = {
            id: category.parent,
            name: '',
            children: {},
          };
        }
        categoryMap[category.parent].children[category.id] = category;
      } else {
        categoryTree[category.id] = category;
      }
    });
    return categoryTree;
  }

  async getProductsOfCategory(categoryId: string) {
    const productOfCategory = this.commerceToolsAPI.getProductsOfCategory(categoryId);
    return productOfCategory;
  }

  async getBreadcrumbsOfCategory(categoryId: string) {
    const breadcrumbsOfCategory = this.commerceToolsAPI.getBreadcrumbsOfCategory(categoryId);
    return breadcrumbsOfCategory;
  }

  async addToCart(productId: string) {
    const cartId = localStorage.getItem('cartPetShopId') as string;
    const currentCart = await this.commerceToolsAPI.getCart(cartId);
    const currentCartVersion = Number(currentCart?.body.version);
    const result = await this.commerceToolsAPI.addToCart(cartId, productId, 1, 1, currentCartVersion);
    return result;
  }

  async getProductInCart() {
    const cartId = localStorage.getItem('cartPetShopId') as string;
    let listProductInCart;
    const currentCard = await this.commerceToolsAPI.getCart(cartId);
    if (currentCard) {
      listProductInCart = currentCard?.body.lineItems.map((lineItem) => lineItem.productId);
    }
    return listProductInCart;
  }
}
