import HTMLCreator from '../HTMLCreator';

export default class Main {
  renderPage() {
    const mainField = HTMLCreator.createElement('main', { class: 'main-field' }, [
      HTMLCreator.createElement('section', { class: 'main-area' }, [
        HTMLCreator.createElement('p', { class: 'main-area__text' }, [
          `Welcome to Paws & Claws, your ultimate destination for online pet shopping!`,
        ]),
      ]),
    ]);
    return mainField;
  }
}
