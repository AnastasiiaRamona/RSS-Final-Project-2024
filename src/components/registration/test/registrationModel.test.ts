import Toastify from 'toastify-js';
import { BaseAddress } from '@commercetools/platform-sdk';

import RegistrationModel from '../registrationModel';

jest.mock('toastify-js', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    showToast: jest.fn(),
  }),
}));

jest.mock('../../commerceToolsAPI', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    register: jest.fn(),
  })),
}));

describe('RegistrationModel', () => {
  let registrationModel: RegistrationModel;

  beforeEach(() => {
    registrationModel = new RegistrationModel();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle successful registration', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const firstName = 'John';
    const lastName = 'Doe';
    const dateOfBirth = '1990-01-01';
    const billingAddress: BaseAddress = {
      country: 'USA',
      streetName: '123 Main St',
      postalCode: '12345',
      city: 'New York',
    };
    const shippingAddress: BaseAddress = {
      country: 'USA',
      streetName: '456 Elm St',
      postalCode: '54321',
      city: 'Los Angeles',
    };
    const isBillingAddressDefault = true;
    const isShippingAddressDefault = true;

    const expectedResult = {};
    (registrationModel.commerceToolsAPI.register as jest.Mock).mockResolvedValueOnce(expectedResult);

    const result = await registrationModel.register(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      billingAddress,
      shippingAddress,
      isBillingAddressDefault,
      isShippingAddressDefault
    );

    expect(registrationModel.commerceToolsAPI.register).toHaveBeenCalledTimes(1);
    expect(registrationModel.commerceToolsAPI.register).toHaveBeenCalledWith(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      billingAddress,
      shippingAddress,
      isBillingAddressDefault,
      isShippingAddressDefault
    );

    expect(Toastify).not.toHaveBeenCalled();

    expect(result).toEqual(expectedResult);
  });

  test('should handle registration error', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const firstName = 'John';
    const lastName = 'Doe';
    const dateOfBirth = '1990-01-01';
    const billingAddress: BaseAddress = {
      country: 'USA',
      streetName: '123 Main St',
      postalCode: '12345',
      city: 'New York',
    };
    const shippingAddress: BaseAddress = {
      country: 'USA',
      streetName: '456 Elm St',
      postalCode: '54321',
      city: 'Los Angeles',
    };
    const isBillingAddressDefault = true;
    const isShippingAddressDefault = true;

    const errorMessage = 'There is already an existing customer with the provided email.';
    const errorCode = 400;
    const expectedError = new Error(errorMessage);
    Object.defineProperty(expectedError, 'code', { value: errorCode });
    (registrationModel.commerceToolsAPI.register as jest.Mock).mockRejectedValueOnce(expectedError);

    const result = await registrationModel.register(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      billingAddress,
      shippingAddress,
      isBillingAddressDefault,
      isShippingAddressDefault
    );

    expect(registrationModel.commerceToolsAPI.register).toHaveBeenCalledTimes(1);
    expect(registrationModel.commerceToolsAPI.register).toHaveBeenCalledWith(
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      billingAddress,
      shippingAddress,
      isBillingAddressDefault,
      isShippingAddressDefault
    );

    expect(Toastify).toHaveBeenCalledTimes(1);
    expect(Toastify).toHaveBeenCalledWith({
      text: 'A user with the specified email already exists. Enter a different email or try to log in.',
      newWindow: true,
      className: 'info',
      close: true,
      selector: document.querySelector('.form-registration'),
      stopOnFocus: true,
      offset: {
        y: 350,
        x: 0,
      },
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
      duration: 3000,
    });
    expect(result).toBe(false);
  });
});
