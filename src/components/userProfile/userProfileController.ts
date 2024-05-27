import UserProfileModel from './userProfileModel';

export default class UserProfileController {
  model: UserProfileModel;

  id: string | null = localStorage.getItem('userPetShopId');

  constructor() {
    this.model = new UserProfileModel();
  }

  async getCustomerById() {
    let customerData;
    if (this.id) {
      const result = await this.model.getCustomerById(this.id);
      customerData = {
        email: result?.body.email,
        password: result?.body.password,
        firstName: result?.body.firstName,
        lastName: result?.body.lastName,
        dateOfBirth: result?.body.dateOfBirth,
        addresses: result?.body.addresses,
        billingAddressId: result?.body.billingAddressIds,
        shippingAddressId: result?.body.shippingAddressIds,
        defaultBillingAddressId: result?.body.defaultBillingAddressId,
        defaultShippingAddressId: result?.body.defaultShippingAddressId,
      };
    }
    return customerData;
  }
}
