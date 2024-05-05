/* eslint-disable class-methods-use-this */
export default class LoginModel {
  validateEmail(email: string) {
    return /^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2,4}$/i.test(email);
  }

  createEmailValidationMessage(email: string) {
    if (!email) return 'Email is required';
    if (!/^\S.*\S$/.test(email)) return 'Email address must not contain leading or trailing whitespace.';
    if (!/^[a-zA-Z-._+-@]+$/.test(email)) return 'You can only use hyphens underscores and English letters.';
    if (!/@/.test(email)) return 'The email address must contain @.';
    if (!/^[^@]/.test(email)) return 'The email address cannot start with @.';
    if (/@[.]/.test(email)) return 'The use of a dot in this location is unacceptable';
    if (!/@[^@]+\.+[a-zA-Z]{2,}$/.test(email)) return 'Email address is not complete, enter domain';
    return '';
  }

  validatePassword(password: string) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  }

  createPasswordValidationMessage(password: string) {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password should be at least 8 characters long.';
    if (!/\d/.test(password)) return 'Password should contain at least one digit.';
    if (!/[a-z]/.test(password)) return 'Password should contain at least one lowercase letter.';
    if (!/[A-Z]/.test(password)) return 'Password should contain at least one uppercase letter.';
    if (!/[\W_]/.test(password)) return 'Password should contain at least one special character.';
    if (!/^\S.*\S$/.test(password)) return 'Password must not contain leading or trailing whitespace.';
    return '';
  }
}
