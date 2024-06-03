import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';

export default class ChangePasswordForm {
  private buttons: Buttons;

  constructor() {
    this.buttons = new Buttons();
  }

  renderChangePasswordForm() {
    const resetButton = this.buttons.renderResetButton();
    const submitButton = this.buttons.renderSubmitButton();
    const closeButton = this.buttons.renderCloseButton();

    const form = HTMLCreator.createElement('form', { class: 'security-settings-form' }, [
      HTMLCreator.createElement('label', { for: 'current-password' }, ['Enter your current password:']),
      HTMLCreator.createElement('input', {
        type: 'password',
        id: 'current-password',
        name: 'current-password',
      }) as HTMLInputElement,
      HTMLCreator.createElement('label', { for: 'new-password' }, ['Enter your new password:']),
      HTMLCreator.createElement('div', { class: 'new-password-container' }, [
        HTMLCreator.createElement('input', {
          type: 'password',
          id: 'new-password',
          name: 'new-password',
          class: 'input-password',
        }) as HTMLInputElement,
        resetButton,
        submitButton,
        closeButton,
      ]),
    ]) as HTMLFormElement;

    const newPasswordInput = form.querySelector('#new-password') as HTMLInputElement;

    resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      newPasswordInput.value = '';
      const inputEvent = new Event('input', { bubbles: true });
      newPasswordInput.dispatchEvent(inputEvent);
    });

    return form;
  }
}
