interface RegistrationElements {
  body: HTMLElement;
  container: HTMLElement;
  titleRegistration: HTMLElement;
  form: HTMLElement;
  fieldset: HTMLElement;
  legend: HTMLElement;
  inputMail: HTMLInputElement | HTMLElement;
  inputPassword: HTMLInputElement | HTMLElement;
  inputUsername: HTMLInputElement | HTMLElement;
  inputSurname: HTMLInputElement | HTMLElement;
  inputDate: HTMLInputElement | HTMLElement;
  inputStreet: HTMLInputElement | HTMLElement;
  inputCity: HTMLInputElement | HTMLElement;
  inputPostalCode: HTMLInputElement | HTMLElement;
  inputCountry: HTMLInputElement | HTMLElement;
  labelMail: HTMLElement;
  labelPassword: HTMLElement;
  labelUsername: HTMLElement;
  labelSurname: HTMLElement;
  labelDate: HTMLElement;
  labelStreet: HTMLElement;
  labelCity: HTMLElement;
  labelPostalCode: HTMLElement;
  labelCountry: HTMLElement;
  buttonRegistration: HTMLElement;
  registrationBackground: HTMLElement;
  validate: { inputs: NodeListOf<HTMLInputElement> };
}
export default RegistrationElements;
