import HTMLCreation from '../HTMLCreation';
import RegistrationController from './registrationController';

export default class Registration {
  controller: RegistrationController;

  constructor() {
    this.controller = new RegistrationController();
  }

  renderDatalist() {
    const countries = ['United States', 'Germany', 'Italy'];
    const options = countries.map((country) => HTMLCreation.createElement('option', { value: country }));
    return HTMLCreation.createElement('datalist', { id: 'countryList' }, options);
  }

  renderFieldsetRegistrationUsers() {
    const fieldsetRegistrationUsers = HTMLCreation.createElement('fieldset', { class: 'fieldset-users' }, [
      HTMLCreation.createElement('legend', { class: 'legend-registration' }, ['Form Registration Users']),
      HTMLCreation.createElement('label', { class: 'label label-mail' }, ['Mail:']),
      HTMLCreation.createElement('input', {
        type: 'email',
        class: 'input-mail input',
        placeholder: 'example@email.com',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-password' }, ['Password:']),
      HTMLCreation.createElement('input', {
        type: 'password',
        class: 'input-password input',
        placeholder: 'password',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-username' }, ['Username:']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-username input',
        placeholder: 'username',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-surname' }, ['Surname']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-surname input',
        placeholder: 'surname',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-date' }, ['Date of birth:']),

      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-date input',
        placeholder: 'DD.MM.YYYY',
        required: 'true',
      }),
    ]);
    return fieldsetRegistrationUsers;
  }

  renderFieldsetRegistrationAddress() {
    const fieldsetRegistrationAddress = HTMLCreation.createElement('fieldset', { class: 'fieldset-address' }, [
      HTMLCreation.createElement('legend', { class: 'legend-registration' }, ['Form Registration Address']),
      HTMLCreation.createElement('label', { class: 'label label-street' }, ['Street:']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-street input',
        placeholder: 'street',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-city' }, ['City:']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-city input',
        placeholder: 'city',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-code' }, ['Postal code:']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-code input',
        placeholder: 'postal code',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-country' }, ['Country']),
      HTMLCreation.createElement(
        'input',
        {
          type: 'text',
          class: 'input-country input',
          placeholder: 'select one country',
          required: 'true',
          list: 'countryList',
        },
        [this.renderDatalist()]
      ),
    ]);
    return fieldsetRegistrationAddress;
  }

  renderForm() {
    const form = HTMLCreation.createElement('form', { class: 'form  form-registration', action: '/' }, [
      this.renderFieldsetRegistrationUsers(),
      this.renderFieldsetRegistrationAddress(),
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
    this.controller.checkValidate();
  }
}
