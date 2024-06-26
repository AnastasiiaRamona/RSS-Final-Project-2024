import { CustomerUpdate } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class UserProfileModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getCustomerById(id: string) {
    const result = await this.commerceToolsAPI.getCustomerByID(id);
    return result;
  }

  async updateEmail(version: number, id: string, newEmail: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'changeEmail',
          email: newEmail,
        },
      ],
    };
    try {
      await this.commerceToolsAPI.updateCustomer(id, updateData);
    } catch (error) {
      this.showResponseMessage('A user with the specified email already exists. Enter a different email.');
      throw error;
    }
  }

  async updateFirstName(version: number, id: string, newFirstName: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setFirstName',
          firstName: newFirstName,
        },
      ],
    };

    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async updateLastName(version: number, id: string, newLastName: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setLastName',
          lastName: newLastName,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async updateDateOfBirth(version: number, id: string, newDateOfBirth: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDateOfBirth',
          dateOfBirth: newDateOfBirth,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
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

  async changeUserPassword(version: number, currentPassword: string, newPassword: string, email: string) {
    try {
      const result = await this.commerceToolsAPI.changePassword(version, currentPassword, newPassword, email);
      return result;
    } catch (error) {
      if (newPassword === '') {
        this.showResponseMessage('You need to enter a new password');
      } else {
        this.showResponseMessage('The current password is incorrect');
      }
      throw error;
    }
  }

  async addNewAddress(
    version: number,
    id: string,
    streetName: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    const newAddress = {
      streetName,
      postalCode,
      city,
      country,
    };

    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'addAddress',
          address: newAddress,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async setBillingAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'addBillingAddressId',
          addressId,
        },
      ],
    };

    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async setShippingAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async setDefaultShippingAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDefaultShippingAddress',
          addressId,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async setDefaultBillingAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async setDefaultGeneralAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'setDefaultBillingAddress',
          addressId,
        },
        {
          action: 'setDefaultShippingAddress',
          addressId,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async removeAddress(version: number, id: string, addressId: string) {
    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }

  async changeAddress(
    version: number,
    id: string,
    addressId: string,
    streetName: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    const updatedAddress = {
      streetName,
      postalCode,
      city,
      country,
    };

    const updateData: CustomerUpdate = {
      version,
      actions: [
        {
          action: 'changeAddress',
          addressId,
          address: updatedAddress,
        },
      ],
    };
    await this.commerceToolsAPI.updateCustomer(id, updateData);
  }
}
