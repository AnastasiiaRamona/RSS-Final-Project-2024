import CommerceToolsAPI from './components/commerceToolsAPI';
import LoginModel from './components/login/loginModel';

jest.mock('./components/commerceToolsAPI');

describe('Test class Login Model', () => {
  beforeAll(() => {
    (CommerceToolsAPI as jest.Mock).mockImplementation(() => null);
  });

  const loginModel = new LoginModel();
  console.log(loginModel);
});
