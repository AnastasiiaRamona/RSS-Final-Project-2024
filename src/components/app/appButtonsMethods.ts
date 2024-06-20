export default class AppButtonsMethods {
  disableButton(button: HTMLButtonElement) {
    const disabledButton = button;
    disabledButton.disabled = true;
    disabledButton.classList.add('clicked');
  }

  activateButton(button: HTMLButtonElement) {
    const activatedButton = button;
    activatedButton.disabled = false;
    activatedButton.classList.remove('clicked');
  }

  toggleButton(activeButton: HTMLButtonElement, buttonsArray: HTMLButtonElement[], fromTitle = false) {
    buttonsArray.forEach((button) => {
      if (button === activeButton) {
        if (button.disabled && !fromTitle) {
          this.activateButton(button);
        } else {
          this.disableButton(button);
        }
      } else {
        this.activateButton(button);
      }
    });
  }
}
