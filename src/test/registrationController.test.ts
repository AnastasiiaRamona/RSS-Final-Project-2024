import fetchMock from 'jest-fetch-mock';

import RegistrationController from '../components/registration/registrationController';

fetchMock.enableMocks();

describe('RegistrationController', () => {
  let controller: RegistrationController;

  beforeEach(() => {
    controller = new RegistrationController();
  });

  test('checkValidate method sets custom validity for input elements', () => {
    document.body.innerHTML = `
      <form class="form-registration">
        <input type="text" class="input input-mail">
        <input type="password" class="input input-password">
        <!-- Add more input elements as needed -->
      </form>
    `;

    controller.checkValidate();

    const emailInput = document.querySelector('.input-mail') as HTMLInputElement;
    expect(emailInput.validity.customError).toBe(true);
  });

  test('changeFormAddresses method changes form addresses based on checkbox state', () => {
    document.body.innerHTML = `
      <div class="form-inner"></div>
      <input type="checkbox" class="input-checkbox__address">
    `;
    const billing = document.createElement('div');
    const shipping = document.createElement('div');
    const addresses = document.createElement('div');

    const checkboxAddresses = document.querySelector('.input-checkbox__address') as HTMLInputElement;
    checkboxAddresses.checked = true;

    controller.changeFormAddresses(billing, shipping, addresses);

    const formInner = document.querySelector('.form-inner');
    expect(formInner?.innerHTML).toEqual(addresses.outerHTML);

    checkboxAddresses.checked = false;
    controller.changeFormAddresses(billing, shipping, addresses);

    expect(formInner?.innerHTML).toEqual(`${billing.outerHTML}${shipping.outerHTML}`);
  });

  test('parseDateString method returns correctly formatted date string', () => {
    const dateString = '31.12.2023';
    const expectedDate = '2023-12-31';
    const parsedDate = controller.parseDateString(dateString);
    expect(parsedDate).toBe(expectedDate);
  });
});
