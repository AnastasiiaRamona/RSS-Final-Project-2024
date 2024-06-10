import MissingPage from '../components/missingPage/missingPageView';
import HTMLCreator from '../components/HTMLCreator';
import petPath from '../../assets/dogs.webp';
import errorPath from '../../assets/404Error.webp';

jest.mock('../components/HTMLCreator');

describe('MissingPage', () => {
  let missingPage: MissingPage;
  let createElementMock: jest.Mock;

  beforeEach(() => {
    missingPage = new MissingPage();

    createElementMock = HTMLCreator.createElement as jest.Mock;

    createElementMock.mockImplementation(
      (tagName: string, attributes?: { [key: string]: string }, children?: (HTMLElement | string)[]) => {
        const element = document.createElement(tagName);

        if (attributes) {
          Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
          });
        }

        if (children) {
          children.forEach((child) => {
            if (typeof child === 'string') {
              element.textContent = child;
            } else {
              element.appendChild(child);
            }
          });
        }

        return element;
      }
    );
  });

  test('renderPage creates correct HTML elements', () => {
    const mainElement = missingPage.renderPage();

    expect(createElementMock).toHaveBeenCalledTimes(5);

    expect(createElementMock).toHaveBeenCalledWith('main', { class: 'missing-page' });
    expect(createElementMock).toHaveBeenCalledWith('img', {
      class: 'missing-page__image',
      src: petPath,
      alt: '404 Image',
    });
    expect(createElementMock).toHaveBeenCalledWith('img', {
      class: 'missing-page__image-error',
      src: errorPath,
      alt: '404 Image',
    });
    expect(createElementMock).toHaveBeenCalledWith(
      'h2',
      {
        class: 'missing-page__heading',
      },
      ['Sorry, the page you requested was not found 😿 Please select a different page or go back.']
    );
    expect(createElementMock).toHaveBeenCalledWith('div', { class: 'container-missing-page' }, [
      expect.any(HTMLElement),
      expect.any(HTMLElement),
    ]);

    expect(mainElement).not.toBeNull();
    expect(mainElement.classList.contains('missing-page')).toBe(true);
    expect(mainElement.querySelector('.missing-page__image')).not.toBeNull();
    expect(mainElement.querySelector('.missing-page__image-error')).not.toBeNull();
    expect(mainElement.querySelector('.missing-page__heading')).not.toBeNull();
  });
});
