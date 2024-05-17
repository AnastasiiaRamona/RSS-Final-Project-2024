import iso3166 from 'iso-3166-1';
import { BaseAddress } from '@commercetools/platform-sdk';
import HTMLCreation from '../HTMLCreation';

import RegistrationController from './registrationController';

import FieldsetRegistrationAddress from './componentsUI/fieldsetElement';

export default class Registration {
  controller: RegistrationController;

  billingFieldset: FieldsetRegistrationAddress;

  shippingFieldset: FieldsetRegistrationAddress;

  addressesFieldset: FieldsetRegistrationAddress;

  registrationUsersFieldset: FieldsetRegistrationAddress;

  constructor() {
    this.controller = new RegistrationController();
    this.billingFieldset = new FieldsetRegistrationAddress('__billing', 'Billing address form');
    this.shippingFieldset = new FieldsetRegistrationAddress('__shipping', 'Shipping address form');
    this.addressesFieldset = new FieldsetRegistrationAddress('__addresses', 'Addresses form');
    this.registrationUsersFieldset = new FieldsetRegistrationAddress('', '');
  }

  private renderForm() {
    const form = HTMLCreation.createElement('form', { class: 'form  form-registration', action: '/' }, [
      this.registrationUsersFieldset.renderFieldsetRegistrationUsers(),
      HTMLCreation.createElement('label', { class: 'label label-delivery__criterion' }, [
        'Set as billing and shipping address',
      ]),
      HTMLCreation.createElement('input', {
        type: 'checkbox',
        class: 'input input-checkbox__address',
      }),

      HTMLCreation.createElement('div', { class: 'form-inner' }, [
        this.billingFieldset.renderFieldsetRegistrationAddress(),
        this.shippingFieldset.renderFieldsetRegistrationAddress(),
      ]),
      HTMLCreation.createElement('button', { class: 'button button-registration' }, ['registration']),
    ]);
    return form;
  }

  renderPage() {
    const registrationMain = HTMLCreation.createElement('main', { class: 'registration-main' }, [
      HTMLCreation.createElement('div', { class: 'container container-registration' }, [this.renderForm()]),
    ]);
    return registrationMain;
  }

  addEventListeners() {
    const billingAddress = this.billingFieldset.renderFieldsetRegistrationAddress();
    const shippingAddress = this.shippingFieldset.renderFieldsetRegistrationAddress();
    const allAddresses = this.addressesFieldset.renderFieldsetRegistrationAddress();
    const checkboxAddresses = document.querySelector('.input-checkbox__address') as HTMLInputElement;
    this.controller.checkValidate();
    checkboxAddresses?.addEventListener('change', (event: Event) => {
      event.preventDefault();
      this.controller.changeFormAddresses(billingAddress, shippingAddress, allAddresses);
    });

    document.querySelector('.form')?.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      const inputDateValue = (document.querySelector('.input-date') as HTMLInputElement).value;
      const dateOfBirth = this.controller.parseDateString(inputDateValue);
      const inputMailValue = (document.querySelector('.input-mail') as HTMLInputElement).value;
      const inputPasswordValue = (document.querySelector('.input-password') as HTMLInputElement).value;
      const inputUsernameValue = (document.querySelector('.input-username') as HTMLInputElement).value;
      const inputSurnameValue = (document.querySelector('.input-surname') as HTMLInputElement).value;

      let isBillingAddressDefault: boolean;
      let isShippingAddressDefault: boolean;
      let billingAddressResult: BaseAddress;
      let shippingAddressResult: BaseAddress;

      const billingAddressInput = document.querySelector('.input-street__billing');
      if (billingAddressInput) {
        billingAddressResult = this.getBillingAddress();
        shippingAddressResult = this.getShippingAddress();
        isBillingAddressDefault = (document.querySelector('.check-default__billing') as HTMLInputElement).checked;
        isShippingAddressDefault = (document.querySelector('.check-default__shipping') as HTMLInputElement).checked;
      } else {
        billingAddressResult = this.getGeneralAddress();
        shippingAddressResult = this.getGeneralAddress();
        isBillingAddressDefault = (document.querySelector('.check-default__addresses') as HTMLInputElement).checked;
        isShippingAddressDefault = (document.querySelector('.check-default__addresses') as HTMLInputElement).checked;
      }

      this.controller.getRegistration(
        inputMailValue,
        inputPasswordValue,
        inputUsernameValue,
        inputSurnameValue,
        dateOfBirth,
        billingAddressResult,
        shippingAddressResult,
        isBillingAddressDefault,
        isShippingAddressDefault
      );
    });
  }

  private getBillingAddress() {
    const inputStreet = (document.querySelector('.input-street__billing') as HTMLInputElement).value;
    const inputCity = (document.querySelector('.input-city__billing') as HTMLInputElement).value;
    const inputPostalCode = (document.querySelector('.input-code__billing') as HTMLInputElement).value;
    const inputCountry = (document.querySelector('.input-country__billing') as HTMLInputElement).value;
    let inputCountryCode = iso3166.whereCountry(inputCountry)?.alpha2 || 'UNDEFINED';
    if (inputCountry === 'United States') {
      inputCountryCode = 'US';
    }
    return {
      country: inputCountryCode,
      streetName: inputStreet,
      postalCode: inputPostalCode,
      city: inputCity,
    };
  }

  private getShippingAddress() {
    const inputStreet = (document.querySelector('.input-street__shipping') as HTMLInputElement).value;
    const inputCity = (document.querySelector('.input-city__shipping') as HTMLInputElement).value;
    const inputPostalCode = (document.querySelector('.input-code__shipping') as HTMLInputElement).value;
    const inputCountry = (document.querySelector('.input-country__shipping') as HTMLInputElement).value;
    let inputCountryCode = iso3166.whereCountry(inputCountry)?.alpha2 || 'UNDEFINED';
    if (inputCountry === 'United States') {
      inputCountryCode = 'US';
    }
    return {
      country: inputCountryCode,
      streetName: inputStreet,
      postalCode: inputPostalCode,
      city: inputCity,
    };
  }

  private getGeneralAddress() {
    const inputStreet = (document.querySelector('.input-street__addresses') as HTMLInputElement).value;
    const inputCity = (document.querySelector('.input-city__addresses') as HTMLInputElement).value;
    const inputPostalCode = (document.querySelector('.input-code__addresses') as HTMLInputElement).value;
    const inputCountry = (document.querySelector('.input-country__addresses') as HTMLInputElement).value;
    let inputCountryCode = iso3166.whereCountry(inputCountry)?.alpha2 || 'UNDEFINED';
    if (inputCountry === 'United States') {
      inputCountryCode = 'US';
    }
    return {
      country: inputCountryCode,
      streetName: inputStreet,
      postalCode: inputPostalCode,
      city: inputCity,
    };
  }
}
