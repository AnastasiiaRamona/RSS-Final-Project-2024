import HTMLCreator from '../components/HTMLCreator';
import Buttons from '../components/userProfile/componentsUI/buttons';
import editIcon from '../../../assets/edit.svg';
import passwordIconSrc from '../../../assets/password-icon.webp';
import resetIconSrc from '../../../assets/reset-button.webp';
import submitIconSrc from '../../../assets/submit-button.webp';
import shippingAddressIconSrc from '../../../assets/shipping-address-icon.webp';
import billingAddressIconSrc from '../../../assets/billing-address-icon.webp';
import closeIconSrc from '../../../assets/close-icon.webp';
import newAddressSrc from '../../../assets/new-address.webp';
import deleteButtonSrc from '../../../assets/delete-icon.webp';

jest.mock('../components/HTMLCreator', () => ({
  createElement: jest.fn(),
}));

describe('Buttons', () => {
  let buttons: Buttons;

  beforeEach(() => {
    buttons = new Buttons();
    (HTMLCreator.createElement as jest.Mock).mockClear();
    (HTMLCreator.createElement as jest.Mock).mockImplementation(
      (
        tagName: string,
        attributes: { [key: string]: string },
        children: (HTMLElement | HTMLInputElement | string | null | undefined)[] = []
      ) => {
        const element = document.createElement(tagName);
        Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
        (children || []).forEach((child) => {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            element.appendChild(child);
          }
        });
        return element;
      }
    );
  });

  test('should render reset button', () => {
    const resetButton = buttons.renderResetButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('input', {
      type: 'image',
      class: 'reset-img',
      src: resetIconSrc,
      title: 'Reset',
    });
    expect(resetButton).toBeDefined();
  });

  test('should render submit button', () => {
    const submitButton = buttons.renderSubmitButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('input', {
      class: 'submit-img',
      type: 'image',
      src: submitIconSrc,
      title: 'Submit',
    });
    expect(submitButton).toBeDefined();
  });

  test('should render delete button', () => {
    const deleteButton = buttons.renderDeleteButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('img', {
      class: 'delete-img',
      src: deleteButtonSrc,
      alt: 'delete button',
      title: 'Delete',
    });
    expect(deleteButton).toBeDefined();
  });

  test('should render edit button', () => {
    const editButton = buttons.renderEditButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('img', {
      class: 'edit-button',
      src: editIcon,
      alt: 'edit button',
      title: 'Edit',
    });
    expect(editButton).toBeDefined();
  });

  test('should render change password button', () => {
    const changePasswordButton = buttons.renderChangePasswordButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('img', {
      class: 'password-icon-img',
      src: passwordIconSrc,
      alt: 'password icon',
      title: 'Change password',
    });
    expect(changePasswordButton).toBeDefined();
  });

  test('should get address icon src', () => {
    const shippingIconSrc = buttons.getAddressIconSrc('shipping');
    const billingIconSrc = buttons.getAddressIconSrc('billing');

    expect(shippingIconSrc).toBe(shippingAddressIconSrc);
    expect(billingIconSrc).toBe(billingAddressIconSrc);
  });

  test('should render close button', () => {
    const closeButton = buttons.renderCloseButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('img', {
      class: 'close-icon-img',
      src: closeIconSrc,
      alt: 'close button',
      title: 'Close',
    });
    expect(closeButton).toBeDefined();
  });

  test('should render add new address button', () => {
    const addNewAddressButton = buttons.renderAddNewAddressButton();

    expect(HTMLCreator.createElement).toHaveBeenCalledWith('img', {
      class: 'new-address-icon-img',
      src: newAddressSrc,
      alt: 'add new address icon',
    });
    expect(addNewAddressButton).toBeDefined();
  });

  test('should remove inactivity of new address button', () => {
    document.body.innerHTML = '<button class="add-new-address-button" disabled></button>';
    buttons.removeInactivityOfNewAddressButton();
    const addNewAddressButton = document.querySelector('.add-new-address-button') as HTMLButtonElement;

    expect(addNewAddressButton.hasAttribute('disabled')).toBe(false);
    expect(addNewAddressButton.classList.contains('inactive')).toBe(false);
  });

  test('should add inactivity of new address button', () => {
    document.body.innerHTML = '<button class="add-new-address-button"></button>';
    buttons.addInactivityOfNewAddressButton();
    const addNewAddressButton = document.querySelector('.add-new-address-button') as HTMLButtonElement;

    expect(addNewAddressButton.hasAttribute('disabled')).toBe(true);
    expect(addNewAddressButton.classList.contains('inactive')).toBe(true);
  });

  test('should add inactivity of edit buttons', () => {
    document.body.innerHTML = `
      <div class="addresses-section">
        <button class="edit-button"></button>
        <button class="edit-button"></button>
      </div>`;
    buttons.addInactivityOfEditButtons();
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
      expect(button.classList.contains('edit-button-inactive')).toBe(true);
    });
  });

  test('should add activity of edit buttons', () => {
    document.body.innerHTML = `
      <div class="addresses-section">
        <button class="edit-button edit-button-inactive"></button>
        <button class="edit-button edit-button-inactive"></button>
      </div>`;
    buttons.addActivityOfEditButtons();
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
      expect(button.classList.contains('edit-button-inactive')).toBe(false);
    });
  });
});
