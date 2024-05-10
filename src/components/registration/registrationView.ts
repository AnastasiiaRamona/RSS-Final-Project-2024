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

  renderForm() {
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
      HTMLCreation.createElement('div', { class: 'container container-registration' }, [
        HTMLCreation.createElement('h1', { class: 'title title-registration' }, ['Registration']),
        this.renderForm(),
      ]),
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

    document.querySelector('.form')?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const inputMailValue = (document.querySelector('.input-mail') as HTMLInputElement).value;
      const inputPasswordValue = (document.querySelector('.input-password') as HTMLInputElement).value;
      this.controller.getRegistration(inputMailValue, inputPasswordValue);
    });
  }
}
