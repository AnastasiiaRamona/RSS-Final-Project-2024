import fetchMock from 'jest-fetch-mock';

import RegistrationController from '../registrationController';

// Настройка mock для глобальной функции fetch
fetchMock.enableMocks();

describe('RegistrationController', () => {
  let controller: RegistrationController;

  beforeEach(() => {
    controller = new RegistrationController();
  });

  test('checkValidate method sets custom validity for input elements', () => {
    // Mock the form and input elements
    document.body.innerHTML = `
      <form class="form-registration">
        <input type="text" class="input input-mail">
        <input type="password" class="input input-password">
        <!-- Add more input elements as needed -->
      </form>
    `;

    // Call the method to be tested
    controller.checkValidate();

    // Assert that custom validity was set for each input element
    const emailInput = document.querySelector('.input-mail') as HTMLInputElement;
    expect(emailInput.validity.customError).toBe(true);
    // Add assertions for other input elements
  });

  test('changeFormAddresses method changes form addresses based on checkbox state', () => {
    // Mock the HTML elements
    document.body.innerHTML = `
      <div class="form-inner"></div>
      <input type="checkbox" class="input-checkbox__address">
    `;
    const billing = document.createElement('div');
    const shipping = document.createElement('div');
    const addresses = document.createElement('div');

    // Set initial checkbox state
    const checkboxAddresses = document.querySelector('.input-checkbox__address') as HTMLInputElement;
    checkboxAddresses.checked = true;

    // Call the method to be tested
    controller.changeFormAddresses(billing, shipping, addresses);

    // Assert that addresses were changed based on checkbox state
    const formInner = document.querySelector('.form-inner');
    expect(formInner?.innerHTML).toEqual(addresses.outerHTML);

    // Change checkbox state and call the method again
    checkboxAddresses.checked = false;
    controller.changeFormAddresses(billing, shipping, addresses);

    // Assert that addresses were changed based on new checkbox state
    expect(formInner?.innerHTML).toEqual(`${billing.outerHTML}${shipping.outerHTML}`);
  });

  test('parseDateString method returns correctly formatted date string', () => {
    const dateString = '31.12.2023';
    const expectedDate = '2023-12-31';
    const parsedDate = controller.parseDateString(dateString);
    expect(parsedDate).toBe(expectedDate);
  });

  // Add more test cases for other methods of RegistrationController as needed
});
