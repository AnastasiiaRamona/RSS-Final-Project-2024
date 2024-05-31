import Validation from './validation';
import UserProfileModel from './userProfileModel';

export default class UserProfileController {
  model: UserProfileModel;

  id: string | null = localStorage.getItem('userPetShopId');

  constructor() {
    this.model = new UserProfileModel();
  }

  getID() {
    return this.id;
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
        version: result?.body.version,
      };
    }
    return customerData;
  }

  checkValidate(element: HTMLFormElement) {
    Validation.checkValidatePersonalInformation(element);
  }

  async updateEmail(version: number, id: string, newEmail: string) {
    const result = await this.model.updateEmail(version, id, newEmail);
    return result;
  }

  async updateFirstName(version: number, id: string, newFirstName: string) {
    const result = await this.model.updateFirstName(version, id, newFirstName);
    return result;
  }

  async updateLastName(version: number, id: string, newLastName: string) {
    const result = await this.model.updateLastName(version, id, newLastName);
    return result;
  }

  async updateDateOfBirth(version: number, id: string, dateOfBirth: string) {
    const result = await this.model.updateDateOfBirth(version, id, dateOfBirth);
    return result;
  }

  parseDateString(dateString: string): string {
    const [day, month, year] = dateString.split('.');
    const date = `${year}-${month}-${day}`;
    return date;
  }
}
