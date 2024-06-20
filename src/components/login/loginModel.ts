import CommerceToolsAPI from '../commerceToolsAPI';
import QuantityUpdater from '../quantityUpdater';

export default class LoginModel {
  commerceToolsAPI: CommerceToolsAPI;

  quantityUpdater: QuantityUpdater;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
    this.quantityUpdater = new QuantityUpdater();
  }

  validateEmail(email: string) {
    return /^[A-Za-z0-9._+-]+@[A-Za-z0-9-.]+\.+.[A-Za-z]{1,}$/i.test(email);
  }

  createEmailValidationMessage(email: string) {
    if (!email) return 'Email is required';
    if (!/^\S.*\S$/.test(email)) return 'Email address must not contain leading or trailing whitespace.';
    if (!/^[a-zA-Z-._+-@]+$/.test(email)) return 'You can only use hyphens underscores and English letters.';
    if (!/@/.test(email)) return 'The email address must contain @.';
    if (!/^[^@]/.test(email)) return 'The email address cannot start with @.';
    if (!/^[a-zA-Z0-9.-]+@[A-Za-z0-9-.]+\.[a-zA-Z]{1,}$/.test(email))
      return 'Email address is not complete, enter domain';
    return '';
  }

  validatePassword(password: string) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  }

  createPasswordValidationMessage(password: string) {
    if (!password) return 'Password is required';
    if (!/^\S.*\S$/.test(password)) return 'Password must not contain leading or trailing whitespace.';
    if (!/^[0-9a-zA-Z]+$/.test(password)) return 'You can only use English letters and digits';
    if (password.length < 8) return 'Password should be at least 8 characters long.';
    if (!/\d/.test(password)) return 'Password should contain at least one digit.';
    if (!/[a-z]/.test(password)) return 'Password should contain at least one lowercase English letter.';
    if (!/[A-Z]/.test(password)) return 'Password should contain at least one uppercase English letter.';
    return '';
  }

  async login(email: string, password: string) {
    try {
      const response = await this.commerceToolsAPI.login(email, password);
      if (response) {
        const mainPageEvent = new CustomEvent('mainPageEvent');
        document.body.dispatchEvent(mainPageEvent);
        await this.quantityUpdater.updateQuantity();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async emailCheck(email: string) {
    try {
      const response = await this.commerceToolsAPI.emailCheck(email);
      if (response?.body.results.length) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
