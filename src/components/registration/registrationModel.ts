import { BaseAddress } from '@commercetools/platform-sdk';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class RegistrationModel {
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
      return response;
    } catch (error) {
      return new Error('Unsuccessful registration');
    }
  }
}
