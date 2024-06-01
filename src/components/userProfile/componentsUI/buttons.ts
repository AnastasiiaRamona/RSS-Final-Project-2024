import HTMLCreator from '../../HTMLCreator';
import editIcon from '../../../assets/edit.svg';
import passwordIconSrc from '../../../assets/password-icon.png';
import resetIconSrc from '../../../assets/reset-button.png';
import submitIconSrc from '../../../assets/submit-button.png';
import shippingAddressIconSrc from '../../../assets/shipping-address-icon.png';
import billingAddressIconSrc from '../../../assets/billing-address-icon.png';
import closeIconSrc from '../../../assets/close-icon.png';
import newAddressSrc from '../../../assets/new-address.png';
import deleteButtonSrc from '../../../assets/delete-icon.png';

export default class Buttons {
  renderResetButton() {
    const resetButton = HTMLCreator.createElement('input', {
      type: 'image',
      class: 'reset-img',
      src: resetIconSrc,
    });

    return resetButton;
  }

  renderSubmitButton() {
    const submitButton = HTMLCreator.createElement('input', {
      class: 'submit-img',
      type: 'image',
      src: submitIconSrc,
    });
    return submitButton;
  }

  renderDeleteButton() {
    const deleteButton = HTMLCreator.createElement('img', {
      class: 'delete-img',
      src: deleteButtonSrc,
      alt: 'delete button',
    });
    return deleteButton;
  }

  renderEditButton() {
    const editButton = HTMLCreator.createElement('img', { class: 'edit-button', src: editIcon, alt: 'edit button' });
    return editButton;
  }

  renderChangePasswordButton() {
    const passwordIcon = HTMLCreator.createElement('img', {
      class: 'password-icon-img',
      src: passwordIconSrc,
      alt: 'password icon',
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
}
