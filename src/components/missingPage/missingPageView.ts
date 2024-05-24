import HTMLCreator from '../HTMLCreator';
import petPath from '../../assets/dogs.png';
import errorPath from '../../assets/404Error.png';

export default class MissingPage {
  renderPage() {
    const mainElement = HTMLCreator.createElement('main', { class: 'missing-page' });

    const imgElement = HTMLCreator.createElement('img', {
      class: 'missing-page__image',
      src: petPath,
      alt: '404 Image',
    });

    const imgErrorElement = HTMLCreator.createElement('img', {
      class: 'missing-page__image-error',
      src: errorPath,
      alt: '404 Image',
    });

    const headingElement = HTMLCreator.createElement(
      'h2',
      {
        class: 'missing-page__heading',
      },
      ['Sorry, the page you requested was not found 😿 Please select a different page or go back.']
    );

    const container = HTMLCreator.createElement('div', { class: 'container-missing-page' }, [
      imgErrorElement,
      headingElement,
    ]);

    mainElement.appendChild(container);
    mainElement.appendChild(imgElement);

    return mainElement;
  }
}
