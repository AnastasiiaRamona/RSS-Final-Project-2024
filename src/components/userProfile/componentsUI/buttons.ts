import HTMLCreator from '../../HTMLCreator';
import editIcon from '../../../assets/edit.svg';
import passwordIconSrc from '../../../assets/password-icon.webp';
import resetIconSrc from '../../../assets/reset-button.webp';
import submitIconSrc from '../../../assets/submit-button.webp';
import shippingAddressIconSrc from '../../../assets/shipping-address-icon.webp';
import billingAddressIconSrc from '../../../assets/billing-address-icon.webp';
import closeIconSrc from '../../../assets/close-icon.webp';
import newAddressSrc from '../../../assets/new-address.webp';
import deleteButtonSrc from '../../../assets/delete-icon.webp';

export default class Buttons {
  renderResetButton() {
    const resetButton = HTMLCreator.createElement('input', {
      type: 'image',
      class: 'reset-img',
      src: resetIconSrc,
      title: 'Reset',
    });

    return resetButton;
  }

  renderSubmitButton() {
    const submitButton = HTMLCreator.createElement('input', {
      class: 'submit-img',
      type: 'image',
      src: submitIconSrc,
      title: 'Submit',
    });
    return submitButton;
  }

  renderDeleteButton() {
    const deleteButton = HTMLCreator.createElement('img', {
      class: 'delete-img',
      src: deleteButtonSrc,
      alt: 'delete button',
      title: 'Delete',
    });
    return deleteButton;
  }

  renderEditButton() {
    const editButton = HTMLCreator.createElement('img', {
      class: 'edit-button',
      src: editIcon,
      alt: 'edit button',
      title: 'Edit',
    });
    return editButton;
  }

  renderChangePasswordButton() {
    const passwordIcon = HTMLCreator.createElement('img', {
      class: 'password-icon-img',
      src: passwordIconSrc,
      alt: 'password icon',
      title: 'Change password',
    });
    const changePasswordButton = HTMLCreator.createElement('button', { class: 'change-password-button' }, [
      'Change password',
      passwordIcon,
    ]);
    return changePasswordButton;
  }

  getAddressIconSrc(addressType: string): string {
    const iconMap: { [key: string]: string } = {
      shipping: shippingAddressIconSrc,
      billing: billingAddressIconSrc,
    };
    return iconMap[addressType];
  }

  renderCloseButton() {
    const closeButton = HTMLCreator.createElement('img', {
      class: 'close-icon-img',
      src: closeIconSrc,
      alt: 'close button',
      title: 'Close',
    });
    return closeButton;
  }

  renderAddNewAddressButton() {
    const newAddressIcon = HTMLCreator.createElement('img', {
      class: 'new-address-icon-img',
      src: newAddressSrc,
      alt: 'add new address icon',
    });
    const addNewAddressButton = HTMLCreator.createElement('button', { class: 'add-new-address-button hidden' }, [
      'Add new address',
      newAddressIcon,
    ]);
    return addNewAddressButton;
  }

  removeInactivityOfNewAddressButton() {
    const addNewAddressButton = document.querySelector('.add-new-address-button') as HTMLButtonElement;
    addNewAddressButton.removeAttribute('disabled');
    addNewAddressButton.classList.remove('inactive');
  }

  addInactivityOfNewAddressButton() {
    const addNewAddressButton = document.querySelector('.add-new-address-button') as HTMLButtonElement;
    addNewAddressButton.setAttribute('disabled', 'disabled');
    addNewAddressButton.classList.add('inactive');
  }

  addInactivityOfEditButtons() {
    const addressSection = document.querySelector('.addresses-section');
    if (addressSection) {
      const editButtons = addressSection.querySelectorAll('.edit-button');
      editButtons.forEach((button) => {
        button.classList.add('edit-button-inactive');
      });
    }
  }

  addActivityOfEditButtons() {
    const addressSection = document.querySelector('.addresses-section');
    if (addressSection) {
      const editButtons = addressSection.querySelectorAll('.edit-button');
      editButtons.forEach((button) => {
        button.classList.remove('edit-button-inactive');
      });
    }
  }
}
