import { CustomerUpdate, Customer, ClientResponse } from '@commercetools/platform-sdk';
import CommerceToolsAPI from '../components/commerceToolsAPI';
import UserProfileModel from '../components/userProfile/userProfileModel';

jest.mock('../components/commerceToolsAPI', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    getCustomerByID: jest.fn(),
    updateCustomer: jest.fn(),
    changePassword: jest.fn(),
  }),
}));

describe('UserProfileModel', () => {
  let userProfileModel: UserProfileModel;
  let mockCommerceToolsAPI: jest.Mocked<CommerceToolsAPI>;

  beforeEach(() => {
    userProfileModel = new UserProfileModel();
    mockCommerceToolsAPI = userProfileModel.commerceToolsAPI as jest.Mocked<CommerceToolsAPI>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomerById', () => {
    it('should call getCustomerByID on commerceToolsAPI and return the result', async () => {
      const mockCustomer: Customer = {
        id: '123',
        version: 1,
        email: 'test@example.com',
        createdAt: '',
        lastModifiedAt: '',
        addresses: [],
        isEmailVerified: false,
        stores: [],
        authenticationMode: '',
      };
      const mockResult: ClientResponse<Customer> = {
        body: mockCustomer,
        statusCode: 200,
        headers: {},
      };
      mockCommerceToolsAPI.getCustomerByID.mockResolvedValue(mockResult);

      const result = await userProfileModel.getCustomerById('123');

      expect(mockCommerceToolsAPI.getCustomerByID).toHaveBeenCalledWith('123');
      expect(result).toBe(mockResult);
    });
  });

  describe('updateEmail', () => {
    it('should call updateCustomer on commerceToolsAPI with correct data', async () => {
      const version = 1;
      const id = '123';
      const newEmail = 'new@example.com';

      await userProfileModel.updateEmail(version, id, newEmail);

      const expectedUpdateData: CustomerUpdate = {
        version,
        actions: [
          {
            action: 'changeEmail',
            email: newEmail,
          },
        ],
      };

      expect(mockCommerceToolsAPI.updateCustomer).toHaveBeenCalledWith(id, expectedUpdateData);
    });

    it('should show a response message if email already exists', async () => {
      const version = 1;
      const id = '123';
      const newEmail = 'existing@example.com';
      const error = new Error('A user with the specified email already exists.');

      mockCommerceToolsAPI.updateCustomer.mockRejectedValue(error);

      await expect(userProfileModel.updateEmail(version, id, newEmail)).rejects.toThrow(error);
    });
  });
});
