import HTMLCreation from '../HTMLCreation';
// import RegistrationElements from './typeRegistration';
import FormValidate from './registrationModel';

export default class Registration {
  body: HTMLElement = document.body;

  registrationBackground: HTMLElement = HTMLCreation.createElement('div', { class: 'registration-bca' });

  container: HTMLElement = HTMLCreation.createElement('div', { class: 'container container-registration' });

  titleRegistration: HTMLElement = HTMLCreation.createElement('h1', { class: 'title title-registration' }, [
    'Registration',
  ]);

  form: HTMLElement = HTMLCreation.createElement('form', { class: 'form  form-registration', action: '/' });

  fieldset: HTMLElement = HTMLCreation.createElement('fieldset', { class: 'fieldset-registration' });

  legend: HTMLElement = HTMLCreation.createElement('legend', { class: 'legend-registration' }, [
    'Form Registration Users',
  ]);

  labelMail: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-mail' }, ['Mail:']);

  inputMail: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'email',
    class: 'input-mail input',
    placeholder: 'example@email.com',
    required: 'true',
  });

  labelPassword: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-password' }, ['Password:']);

  inputPassword: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'password',
    class: 'input-password input',
    placeholder: 'password',
    required: 'true',
  });

  labelUsername: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-username' }, ['Username:']);

  inputUsername: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-username input',
    placeholder: 'username',
    required: 'true',
  });

  labelSurname: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-surname' }, ['Tsurname']);

  inputSurname: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-surname input',
    placeholder: 'surname',
    required: 'true',
  });

  labelDate: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-date' }, ['Date of birth:']);

  inputDate: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-date input',
    placeholder: 'DD.MM.YYYY',
    required: 'true',
  });

  labelStreet: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-street' }, ['Street:']);

  inputStreet: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-street input',
    placeholder: 'street',
    required: 'true',
  });

  labelCity: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-city' }, ['City:']);

  inputCity: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-city input',
    placeholder: 'city',
    required: 'true',
  });

  labelPostalCode: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-code' }, ['Postal code:']);

  inputPostalCode: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-code input',
    placeholder: 'postal code',
    required: 'true',
  });

  labelCountry: HTMLElement = HTMLCreation.createElement('label', { class: 'label label-country' }, ['Country']);

  inputCountry: HTMLInputElement | HTMLElement = HTMLCreation.createElement('input', {
    type: 'text',
    class: 'input-country input',
    placeholder: 'country',
    required: 'true',
  });

  buttonRegistration: HTMLElement = HTMLCreation.createElement('button', { class: 'button button-registration' }, [
    'registration',
  ]);

  renderPage(): void {
    this.body.appendChild(this.registrationBackground);
    this.registrationBackground.appendChild(this.container);
    this.container.appendChild(this.titleRegistration);
    this.container.appendChild(this.form);
    this.form.appendChild(this.fieldset);
    this.fieldset.appendChild(this.legend);
    this.fieldset.appendChild(this.labelMail);
    this.fieldset.appendChild(this.inputMail);
    this.fieldset.appendChild(this.labelPassword);
    this.fieldset.appendChild(this.inputPassword);
    this.fieldset.appendChild(this.labelUsername);
    this.fieldset.appendChild(this.inputUsername);
    this.fieldset.appendChild(this.labelSurname);
    this.fieldset.appendChild(this.inputSurname);
    this.fieldset.appendChild(this.labelDate);
    this.fieldset.appendChild(this.inputDate);
    this.fieldset.appendChild(this.labelStreet);
    this.fieldset.appendChild(this.inputStreet);
    this.fieldset.appendChild(this.labelPostalCode);
    this.fieldset.appendChild(this.inputPostalCode);
    this.fieldset.appendChild(this.labelCity);
    this.fieldset.appendChild(this.inputCity);
    this.fieldset.appendChild(this.labelCountry);
    this.fieldset.appendChild(this.inputCountry);
    this.fieldset.appendChild(this.buttonRegistration);
  }
}
const registrationPage = new Registration();
registrationPage.renderPage();

const formValidate = new FormValidate();
formValidate.checkValidate();
