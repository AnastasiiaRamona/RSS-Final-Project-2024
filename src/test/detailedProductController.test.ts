import fetchMock from 'jest-fetch-mock';
import DetailedProductController from '../components/detailedProduct/detailedProductController';

import DetailedProductModel from '../components/detailedProduct/detailedProductModel';

fetchMock.enableMocks();

describe('DetailedProductController', () => {
  let controller: DetailedProductController;
  let modelMock: jest.Mocked<DetailedProductModel>;

  beforeEach(() => {
    modelMock = {
      getProductByID: jest.fn(),
    } as unknown as jest.Mocked<DetailedProductModel>;

    controller = new DetailedProductController();
    controller.model = modelMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductByID', () => {
    it('should call getProductByID method of DetailedProductModel', async () => {
      const testID = 'test-id';

      await controller.getProductByID(testID);

      expect(modelMock.getProductByID).toHaveBeenCalledWith(testID);
    });
  });

  describe('renderProductInfo', () => {
    it('should update product information elements correctly', () => {
      document.body.innerHTML = `
        <div class="detailed__product-title"></div>
        <div class="detailed__product-description"></div>
        <div class="detailed__product-price"></div>
        <div class="detailed__product-discount"></div>
      `;
      const title = 'Test Title';
      const description = 'Test Description';
      const price = 1000;
      const discounted = 800;

      controller.renderProductInfo(title, description, price, discounted);

      expect(document.querySelector('.detailed__product-title')?.textContent).toBe(title);
      expect(document.querySelector('.detailed__product-description')?.textContent).toBe(`Description: ${description}`);
      expect(document.querySelector('.detailed__product-price')?.textContent).toBe('10.00 €');
      expect(document.querySelector('.detailed__product-discount')?.textContent).toBe('8.00 €');
      expect(document.querySelector('.detailed__product-price')?.classList.contains('discounted')).toBe(true);
    });
  });

  describe('renderSlideImages', () => {
    it('should render slide images correctly', () => {
      document.body.innerHTML = '<div class="swiper-wrapper"></div>';
      const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

      controller.renderSlideImages(images);

      const slideElements = document.querySelectorAll('.swiper-slide');
      expect(slideElements.length).toBe(images.length);
      slideElements.forEach((slide, index) => {
        expect(slide.querySelector('img')?.getAttribute('src')).toBe(images[index]);
      });
    });
  });
});
