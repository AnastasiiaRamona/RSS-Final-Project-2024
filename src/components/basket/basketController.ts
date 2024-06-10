import BasketModel from './basketModel';

export default class BasketController {
  model: BasketModel;

  constructor() {
    this.model = new BasketModel();
  }
}
