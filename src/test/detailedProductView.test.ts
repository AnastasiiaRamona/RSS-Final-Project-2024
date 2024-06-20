import fetchMock from 'jest-fetch-mock';
import DetailedProduct from '../components/detailedProduct/detailedProductView';
import HTMLCreator from '../components/HTMLCreator';

fetchMock.enableMocks();

jest.mock('../components/HTMLCreator', () => ({
  createElement: jest.fn(),
}));

describe('DetailedProduct', () => {
  let detailedProduct: DetailedProduct;

  beforeEach(() => {
    detailedProduct = new DetailedProduct('123');

    jest.clearAllMocks();
  });

  test('renderMain returns correct HTML structure', () => {
    (HTMLCreator.createElement as jest.Mock).mockImplementation((tag, attrs, children) => {
      const element = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach((key) => element.setAttribute(key, attrs[key]));
      }
      if (children) {
        children.forEach((child: HTMLElement) => {
          const childNode = child instanceof Node ? child : document.createTextNode(String(child));
          element.appendChild(childNode);
        });
      }
      return element;
    });

    const main = detailedProduct.renderMain();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('div', { class: 'detailed__product-wrapper' });
    expect(HTMLCreator.createElement).toHaveBeenCalledWith('main', { class: 'detailed__product' }, expect.any(Array));
    expect(HTMLCreator.createElement).toHaveBeenCalledWith('div', { class: 'swiper' }, expect.any(Array));
    expect(HTMLCreator.createElement).toHaveBeenCalledWith(
      'div',
      { class: 'detailed__product-content' },
      expect.any(Array)
    );

    expect(main).not.toBeNull();
  });
});
