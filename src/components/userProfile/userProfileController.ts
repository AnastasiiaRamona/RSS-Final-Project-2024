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
        billingAddressIds: result?.body.billingAddressIds,
        shippingAddressIds: result?.body.shippingAddressIds,
        defaultBillingAddressId: result?.body.defaultBillingAddressId,
        defaultShippingAddressId: result?.body.defaultShippingAddressId,
        version: result?.body.version,
      };
    }
    return customerData;
  }

  checkValidationPersonalInformation(element: HTMLFormElement) {
    Validation.checkValidationPersonalInformation(element);
  }

  checkValidationPassword(element: HTMLFormElement) {
    Validation.checkValidationPassword(element);
  }

  checkValidationAddress(element: HTMLFormElement) {
    Validation.checkValidationAddress(element);
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

  async changeUserPassword(version: number, currentPassword: string, newPassword: string, email: string) {
    const result = await this.model.changeUserPassword(version, currentPassword, newPassword, email);
    return result;
  }

  async addNewAddress(
    version: number,
    id: string,
    streetName: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    const result = await this.model.addNewAddress(version, id, streetName, postalCode, city, country);
    return result;
  }

  async setBillingAddress(version: number, id: string, addressId: string) {
    const result = await this.model.setBillingAddress(version, id, addressId);
    return result;
  }

  async setShippingAddress(version: number, id: string, addressId: string) {
    const result = await this.model.setShippingAddress(version, id, addressId);
    return result;
  }

  async setDefaultShippingAddress(version: number, id: string, addressId: string) {
    const result = await this.model.setDefaultShippingAddress(version, id, addressId);
    return result;
  }

  async setDefaultBillingAddress(version: number, id: string, addressId: string) {
    const result = await this.model.setDefaultBillingAddress(version, id, addressId);
    return result;
  }

  async setDefaultGeneralAddress(version: number, id: string, addressId: string) {
    const result = await this.model.setDefaultGeneralAddress(version, id, addressId);
    return result;
  }

  async removeAddress(version: number, id: string, addressId: string) {
    const result = await this.model.removeAddress(version, id, addressId);
    return result;
  }

  parseDateString(dateString: string): string {
    const [day, month, year] = dateString.split('.');
    const date = `${year}-${month}-${day}`;
    return date;
  }

  formatDate(date: string) {
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : `${dateObject.getMonth() + 1}`;
    const formattedDate = `${dateObject.getDate()}.${month}.${dateObject.getFullYear()}`;
    return formattedDate;
  }
}
