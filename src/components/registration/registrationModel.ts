import { BaseAddress } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class RegistrationModel {
  showErrorMessage(text: string) {
    Toastify({
      text,
      newWindow: true,
      className: 'info',
      close: true,
      selector: document.querySelector('.form-registration'),
      stopOnFocus: true, // Prevents dismissing of toast on hover
      offset: {
        y: 350,
        x: 0,
      },

      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },

      duration: 3000,
    }).showToast();
  }

  handleError(errorMessage: string, code: number) {
    console.log(code);
    if (errorMessage === 'There is already an existing customer with the provided email.') {
      this.showErrorMessage(
        'A user with the specified email already exists. Enter a different email or try to log in.'
      );
    } else if (code === 500 || code === 502 || code === 504 || code === 503) {
      this.showErrorMessage(`${errorMessage}, try again later`);
    } else this.showErrorMessage(errorMessage);
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
      const commerceToolsAPI = new CommerceToolsAPI();
      const response = await commerceToolsAPI.register(
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

      return response;
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error) {
          this.handleError(error.message, error.code as number);
        }
      }
      return false;
    }
  }
}
