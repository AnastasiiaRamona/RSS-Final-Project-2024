import Toastify from 'toastify-js';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class DetailedProductModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  showResponseMessage(text: string) {
    Toastify({
      text,
      newWindow: true,
      className: 'info',
      close: true,
      stopOnFocus: true,
      offset: {
        y: 200,
        x: 0,
      },
      duration: 5000,
    }).showToast();
  }

  async getProductByID(id: string) {
    try {
      const result = await this.commerceToolsAPI.getProductByID(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.showResponseMessage(error.message);
      }
      return undefined;
    }
  }
}
