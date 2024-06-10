import CommerceToolsAPI from '../commerceToolsAPI';

export default class BasketModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }
}
