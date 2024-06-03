import Toastify from 'toastify-js';
import { BaseAddress } from '@commercetools/platform-sdk';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class RegistrationModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  showResponseMessage(text: string) {
    Toastify({
      text,
      newWindow: true,
      className: 'info',
      close: true,
      stopOnFocus: true,
      offset: {
        y: 200,
        x: 0,
      },
      duration: 5000,
    }).showToast();
  }

  handleResponse(message: string, code: number) {
    if (message) {
      if (message === 'There is already an existing customer with the provided email.') {
        this.showResponseMessage(
          'A user with the specified email already exists. Enter a different email or try to log in.'
        );
      } else if (code === 201) {
        this.showResponseMessage(message);
      } else if (code === 500 || code === 502 || code === 504 || code === 503) {
        this.showResponseMessage(`${message}, try again later`);
      } else this.showResponseMessage(message);
    }
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    billingAddress: BaseAddress,
    shippingAddress: BaseAddress,
    isBillingAddressDefault: boolean,
    isShippingAddressDefault: boolean
  ) {
    try {
      const response = await this.commerceToolsAPI.register(
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

      const mainPageEvent = new CustomEvent('mainPageEvent');
      document.body.dispatchEvent(mainPageEvent);
      if (response) {
        if ('statusCode' in response) {
          this.handleResponse('Welcome Aboard! Your registration was successful.', response.statusCode as number);
        }
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error) {
          this.handleResponse(error.message, error.code as number);
        }
      }
      return false;
    }
  }
}
