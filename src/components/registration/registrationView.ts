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
        class: 'input input-checkbox__adress',
      }),

      HTMLCreation.createElement('div', { class: 'form-inner' }, [
        this.billingFieldset.renderFieldsetRegistrationAddress(),
        this.addressesFieldset.renderFieldsetRegistrationAddress(),
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
    document.body.appendChild(registrationMain);
    return registrationMain;
  }

  addEventListeners() {
    this.controller.checkValidate();
  }
}

const registrationPage = new Registration();
registrationPage.renderPage();
