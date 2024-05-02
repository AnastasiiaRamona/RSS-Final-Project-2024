import MainModel from "./mainModel";

export default class MainController {
  model: MainModel;

  constructor() {
    this.model = new MainModel();
  }
}