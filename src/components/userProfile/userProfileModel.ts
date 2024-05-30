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
}
