import Validation from '../components/userProfile/validation';

describe('Validation', () => {
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    form = document.createElement('form');
    input = document.createElement('input');
    form.appendChild(input);
  });

  const dispatchInputEvent = (value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  };

  test('should validate personal information (email)', () => {
    input.classList.add('input-mail');
    Validation.checkValidationPersonalInformation(form);

    dispatchInputEvent('invalid-email');
    expect(input.validationMessage).toBe('Email was entered incorrectly');

    dispatchInputEvent('valid@example.com');
    expect(input.validationMessage).toBe('');
  });

  test('should validate personal information (name)', () => {
    input.classList.add('input-username');
    Validation.checkValidationPersonalInformation(form);

    dispatchInputEvent('John123');
    expect(input.validationMessage).toBe(
      'The name or surname must contain at least one character and not contain special characters or numbers.'
    );

    dispatchInputEvent('John');
    expect(input.validationMessage).toBe('');
  });

  test('should validate personal information (date)', () => {
    input.classList.add('input-date');
    Validation.checkValidationPersonalInformation(form);

    dispatchInputEvent('31.02.2020');
    expect(input.validationMessage).toBe('You must be at least 13 years old.');

    dispatchInputEvent('31.12.2020');
    expect(input.validationMessage).toBe('You must be at least 13 years old.');

    const date = new Date();
    const currentYear = date.getFullYear();
    dispatchInputEvent(`01.01.${currentYear - 10}`);
    expect(input.validationMessage).toBe('You must be at least 13 years old.');

    dispatchInputEvent(`01.01.${currentYear - 20}`);
    expect(input.validationMessage).toBe('');
  });

  test('should validate password', () => {
    input.classList.add('input-password');
    Validation.checkValidationPassword(form);

    dispatchInputEvent('weakpass');
    expect(input.validationMessage).toBe(
      'Enter a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only English letters and digits are allowed.'
    );

    dispatchInputEvent('StrongPass1');
    expect(input.validationMessage).toBe('');
  });

  test('should validate address', () => {
    input.classList.add('input-street');
    Validation.checkValidationAddress(form);

    dispatchInputEvent('');
    expect(input.validationMessage).toBe('Street must contain at least one character');

    dispatchInputEvent('Main St');
    expect(input.validationMessage).toBe('');
  });

  test('should validate city', () => {
    input.classList.add('input-city');
    Validation.checkValidationAddress(form);

    dispatchInputEvent('City123');
    expect(input.validationMessage).toBe(
      'City must contain at least one character and not contain special characters or numbers'
    );

    dispatchInputEvent('City');
    expect(input.validationMessage).toBe('');
  });

  test('should validate postal code', () => {
    input.classList.add('input-code');
    Validation.checkValidationAddress(form);

    dispatchInputEvent('1234');
    expect(input.validationMessage).toBe('Enter the correct code');

    dispatchInputEvent('12345');
    expect(input.validationMessage).toBe('');
  });

  test('should validate country', () => {
    input.classList.add('input-country');
    Validation.checkValidationAddress(form);

    dispatchInputEvent('France');
    expect(input.validationMessage).toBe('Select one country from the list');

    dispatchInputEvent('Italy');
    expect(input.validationMessage).toBe('');
  });
});
