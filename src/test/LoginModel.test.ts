import CommerceToolsAPI from '../components/commerceToolsAPI';
import LoginModel from '../components/login/loginModel';

jest.mock('../components/commerceToolsAPI');

describe('Test class LoginModel', () => {
  beforeAll(() => {
    (CommerceToolsAPI as jest.Mock).mockImplementation(() => null);
  });

  const loginModel = new LoginModel();
  describe('Test validateEmail method', () => {
    test('Should return false when supplied email is not valid', () => {
      const testEmail = 'testmail.com';
      const result = loginModel.validateEmail(testEmail);
      expect(result).toBeFalsy();
    });

    test('Should return true when supplied email is valid', () => {
      const testEmail = 'example@mail.com';
      const result = loginModel.validateEmail(testEmail);
      expect(result).toBeTruthy();
    });
  });

  describe('Test validatePassword method', () => {
    test('Should return false when supplied password is not valid', () => {
      const testPassword = 'fghr453';
      const result = loginModel.validatePassword(testPassword);
      expect(result).toBeFalsy();
    });

    test('Should return true when supplied password is valid', () => {
      const testPassword = 'qwertyE3$';
      const result = loginModel.validatePassword(testPassword);
      expect(result).toBeTruthy();
    });
  });

  describe('Test createEmailValidationMessage method', () => {
    const testData: { email: string; expectEmail: string; description: string }[] = [
      {
        email: '',
        expectEmail: 'Email is required',
        description: 'no email address is entered',
      },
      {
        email: ' test01@mail.com',
        expectEmail: 'Email address must not contain leading or trailing whitespace.',
        description: 'there is a space before the email',
      },
      {
        email: 'test01@mail.com ',
        expectEmail: 'Email address must not contain leading or trailing whitespace.',
        description: 'there is a space after the email',
      },
      {
        email: 'test01.com',
        expectEmail: 'The email address must contain @.',
        description: 'the email address does not contain @',
      },
      {
        email: '@testmail.com',
        expectEmail: 'The email address cannot start with @.',
        description: 'the email address starts with @',
      },
      {
        email: 'вавыаыв@testmail.com',
        expectEmail: 'You can only use hyphens underscores and English letters.',
        description: 'the email address contains prohibited characters',
      },
      {
        email: '#@testmail.com',
        expectEmail: 'You can only use hyphens underscores and English letters.',
        description: 'the email address contains prohibited characters',
      },
      {
        email: 'test01@testmail',
        expectEmail: 'Email address is not complete, enter domain',
        description: 'the email address does not include a domain',
      },
      {
        email: 'test01@testmail.com',
        expectEmail: '',
        description: 'the email address is entered correctly',
      },
    ];

    test.each(testData)('Should return the string "$expectEmail" if $description.', ({ email, expectEmail }) => {
      const result = loginModel.createEmailValidationMessage(email);
      expect(result).toBe(expectEmail);
    });
  });

  describe('Test createPasswordValidationMessage method', () => {
    const testData: { password: string; expectPassword: string; description: string }[] = [
      {
        password: '',
        expectPassword: 'Password is required',
        description: 'no password is entered',
      },
      {
        password: 'Qwy!25',
        expectPassword: 'Password should be at least 8 characters long.',
        description: 'password contains less than 8 characters',
      },
      {
        password: ' Qwerty!25',
        expectPassword: 'Password must not contain leading or trailing whitespace.',
        description: 'there is a space befor the password',
      },
      {
        password: 'Qwerty!25 ',
        expectPassword: 'Password must not contain leading or trailing whitespace.',
        description: 'there is a space after the password',
      },
      {
        password: 'Йцукен!25',
        expectPassword: 'You can only use English letters,digits and special character.',
        description: 'the password contains prohibited characters',
      },
      {
        password: 'Qwertyrr!',
        expectPassword: 'Password should contain at least one digit.',
        description: 'the password does not contain any digit',
      },
      {
        password: 'QWERTY!25',
        expectPassword: 'Password should contain at least one lowercase English letter.',
        description: 'the password does not contain any lowercase letters',
      },
      {
        password: 'qwerty!25',
        expectPassword: 'Password should contain at least one uppercase English letter.',
        description: 'the password does not contain any uppercase letters',
      },
      {
        password: 'Qwerty!25',
        expectPassword: '',
        description: 'password entered correctly',
      },
    ];

    test.each(testData)(
      'Should return the string "$expectPassword" if $description.',
      ({ password, expectPassword }) => {
        const result = loginModel.createPasswordValidationMessage(password);
        expect(result).toBe(expectPassword);
      }
    );
  });
});
