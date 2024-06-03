import Toastify from 'toastify-js';
import fetchMock from 'jest-fetch-mock';
import DetailedProductModel from '../components/detailedProduct/detailedProductModel';

fetchMock.enableMocks();

jest.mock('toastify-js', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    showToast: jest.fn(),
  }),
}));

describe('DetailedProductModel', () => {
  let detailedProductModel: DetailedProductModel;

  beforeEach(() => {
    detailedProductModel = new DetailedProductModel();
  });

  test('showResponseMessage calls Toastify with correct arguments', () => {
    const errorMessage = 'Error message';

    detailedProductModel.showResponseMessage(errorMessage);

    expect(Toastify).toHaveBeenCalledWith({
      text: errorMessage,
      newWindow: true,
      className: 'info',
      close: true,
      stopOnFocus: true,
      offset: { y: 200, x: 0 },
      duration: 5000,
    });

    expect(Toastify().showToast).toHaveBeenCalled();
  });
});
