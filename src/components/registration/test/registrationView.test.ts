import HTMLCreation from '../../HTMLCreation';

import Registration from '../registrationView';

jest.mock('../../HTMLCreation', () => ({
  createElement: jest.fn(),
}));

jest.mock('../registrationController');
jest.mock('../componentsUI/fieldsetElement');

describe('Registration', () => {
  let registration: Registration;

  beforeEach(() => {
    registration = new Registration();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render form correctly', () => {
    (HTMLCreation.createElement as jest.Mock).mockImplementation((tag: string) => {
      const element = document.createElement(tag);
      return element;
    });

    const form = registration.renderForm();
    expect(HTMLCreation.createElement).toHaveBeenCalled();
    expect(form).toBeTruthy();
  });

  it('should render page correctly', () => {
    (HTMLCreation.createElement as jest.Mock).mockImplementation((tag: string) => {
      const element = document.createElement(tag);
      return element;
    });

    const page = registration.renderPage();
    expect(HTMLCreation.createElement).toHaveBeenCalled();
    expect(page).toBeTruthy();
  });
});
