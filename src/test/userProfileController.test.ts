// Предполагается, что классы Validation и UserProfileModel уже импортированы
import fetchMock from 'jest-fetch-mock';
import Validation from '../components/userProfile/validation';
import UserProfileController from '../components/userProfile/userProfileController';

fetchMock.enableMocks();

jest.mock('../components/userProfile/validation', () => ({
  checkValidationPersonalInformation: jest.fn(),
  checkValidationPassword: jest.fn(),
  checkValidationAddress: jest.fn(),
}));

describe('UserProfileController', () => {
  let userProfileController: UserProfileController;

  beforeEach(() => {
    userProfileController = new UserProfileController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomerById', () => {
    it('should return customer data if ID is available', async () => {
      userProfileController.model.getCustomerById = jest.fn().mockResolvedValue({
        body: {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '01.01.1990',
          addresses: [],
          billingAddressIds: [],
          shippingAddressIds: [],
          defaultBillingAddressId: null,
          defaultShippingAddressId: null,
          version: 1,
        },
      });

      userProfileController.id = '123';

      const customerData = await userProfileController.getCustomerById();

      expect(userProfileController.model.getCustomerById).toHaveBeenCalledWith('123');

      expect(customerData).toEqual({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '01.01.1990',
        addresses: [],
        billingAddressIds: [],
        shippingAddressIds: [],
        defaultBillingAddressId: null,
        defaultShippingAddressId: null,
        version: 1,
      });
    });
  });

  describe('checkValidationPersonalInformation', () => {
    it('should call Validation.checkValidationPersonalInformation with the provided element', () => {
      const mockElement = document.createElement('form');
      userProfileController.checkValidationPersonalInformation(mockElement);
      expect(Validation.checkValidationPersonalInformation).toHaveBeenCalledWith(mockElement);
    });
  });

  describe('checkValidationPassword', () => {
    it('should call Validation.checkValidationPassword with the provided element', () => {
      const mockElement = document.createElement('form');
      userProfileController.checkValidationPassword(mockElement);
      expect(Validation.checkValidationPassword).toHaveBeenCalledWith(mockElement);
    });
  });

  describe('checkValidationAddress', () => {
    it('should call Validation.checkValidationAddress with the provided element', () => {
      const mockElement = document.createElement('form');
      userProfileController.checkValidationAddress(mockElement);
      expect(Validation.checkValidationAddress).toHaveBeenCalledWith(mockElement);
    });
  });

  describe('updateEmail', () => {
    it('should call updateEmail on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.updateEmail = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.updateEmail(1, '123', 'newemail@example.com');

      expect(userProfileController.model.updateEmail).toHaveBeenCalledWith(1, '123', 'newemail@example.com');
      expect(result).toBe(mockResult);
    });
  });

  describe('updateFirstName', () => {
    it('should call updateFirstName on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.updateFirstName = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.updateFirstName(1, '123', 'NewFirstName');

      expect(userProfileController.model.updateFirstName).toHaveBeenCalledWith(1, '123', 'NewFirstName');
      expect(result).toBe(mockResult);
    });
  });

  describe('updateLastName', () => {
    it('should call updateLastName on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.updateLastName = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.updateLastName(1, '123', 'NewLastName');

      expect(userProfileController.model.updateLastName).toHaveBeenCalledWith(1, '123', 'NewLastName');
      expect(result).toBe(mockResult);
    });
  });

  describe('updateDateOfBirth', () => {
    it('should call updateDateOfBirth on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.updateDateOfBirth = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.updateDateOfBirth(1, '123', '1990-01-01');

      expect(userProfileController.model.updateDateOfBirth).toHaveBeenCalledWith(1, '123', '1990-01-01');
      expect(result).toBe(mockResult);
    });
  });

  describe('changeUserPassword', () => {
    it('should call changeUserPassword on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.changeUserPassword = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.changeUserPassword(
        1,
        'oldPassword',
        'newPassword',
        'test@example.com'
      );

      expect(userProfileController.model.changeUserPassword).toHaveBeenCalledWith(
        1,
        'oldPassword',
        'newPassword',
        'test@example.com'
      );
      expect(result).toBe(mockResult);
    });
  });

  describe('addNewAddress', () => {
    it('should call addNewAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.addNewAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.addNewAddress(1, '123', 'Street', '12345', 'City', 'Country');

      expect(userProfileController.model.addNewAddress).toHaveBeenCalledWith(
        1,
        '123',
        'Street',
        '12345',
        'City',
        'Country'
      );
      expect(result).toBe(mockResult);
    });
  });

  describe('setBillingAddress', () => {
    it('should call setBillingAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.setBillingAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.setBillingAddress(1, '123', '456');

      expect(userProfileController.model.setBillingAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('setShippingAddress', () => {
    it('should call setShippingAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.setShippingAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.setShippingAddress(1, '123', '456');

      expect(userProfileController.model.setShippingAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('setDefaultShippingAddress', () => {
    it('should call setDefaultShippingAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.setDefaultShippingAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.setDefaultShippingAddress(1, '123', '456');

      expect(userProfileController.model.setDefaultShippingAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('setDefaultBillingAddress', () => {
    it('should call setDefaultBillingAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.setDefaultBillingAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.setDefaultBillingAddress(1, '123', '456');

      expect(userProfileController.model.setDefaultBillingAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('setDefaultGeneralAddress', () => {
    it('should call setDefaultGeneralAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.setDefaultGeneralAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.setDefaultGeneralAddress(1, '123', '456');

      expect(userProfileController.model.setDefaultGeneralAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('removeAddress', () => {
    it('should call removeAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.removeAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.removeAddress(1, '123', '456');

      expect(userProfileController.model.removeAddress).toHaveBeenCalledWith(1, '123', '456');
      expect(result).toBe(mockResult);
    });
  });

  describe('changeAddress', () => {
    it('should call changeAddress on the model and return the result', async () => {
      const mockResult = { success: true };
      userProfileController.model.changeAddress = jest.fn().mockResolvedValue(mockResult);

      const result = await userProfileController.changeAddress(1, '123', '456', 'Street', '12345', 'City', 'Country');

      expect(userProfileController.model.changeAddress).toHaveBeenCalledWith(
        1,
        '123',
        '456',
        'Street',
        '12345',
        'City',
        'Country'
      );
      expect(result).toBe(mockResult);
    });
  });

  describe('parseDateString', () => {
    it('should parse date string correctly', () => {
      const result = userProfileController.parseDateString('01.01.1990');
      expect(result).toBe('1990-01-01');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = userProfileController.formatDate('1990-01-01');
      expect(result).toBe('1.01.1990');
    });
  });
});
