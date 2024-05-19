import HTMLCreation from '../HTMLCreation';
import petPath from '../../assets/dogs.png';
import errorPath from '../../assets/404Error.png';

export default class MissingPage {
  renderPage() {
    const mainElement = HTMLCreation.createElement('main', { class: 'missing-page' });

    const imgElement = HTMLCreation.createElement('img', {
      class: 'missing-page__image',
      src: petPath,
      alt: '404 Image',
    });

    const imgErrorElement = HTMLCreation.createElement('img', {
      class: 'missing-page__image-error',
      src: errorPath,
      alt: '404 Image',
    });

    const headingElement = HTMLCreation.createElement(
      'h2',
      {
        class: 'missing-page__heading',
      },
      ['Sorry, the page you requested was not found 😿 Please select a different page or go back.']
    );

    const container = HTMLCreation.createElement('div', { class: 'container-missing-page' }, [
      imgErrorElement,
      headingElement,
    ]);

    mainElement.appendChild(container);
    mainElement.appendChild(imgElement);

    return mainElement;
  }
}
