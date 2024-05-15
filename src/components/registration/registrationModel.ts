import { BaseAddress } from '@commercetools/platform-sdk';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class RegistrationModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
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
      return response;
    } catch (error) {
      return new Error('Unsuccessful registration');
    }
  }
}
