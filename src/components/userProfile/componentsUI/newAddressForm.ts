import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';
import generalAddressIconSrc from '../../../assets/address-icon.png';

export default class NewAddressForm {
  private buttons: Buttons;

  constructor() {
    this.buttons = new Buttons();
  }

  renderNewAddressForm() {
    const createResetButton = (input: HTMLInputElement) => {
      const resetButton = this.buttons.renderResetButton();

      resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        const inputOfResetButton = input;
        inputOfResetButton.value = '';
        const inputEvent = new Event('input', { bubbles: true });
        input.dispatchEvent(inputEvent);
      });

      return resetButton;
    };

    let addressIconSrc = this.buttons.getAddressIconSrc('shipping');
    const addressIconShipping = HTMLCreator.createElement('img', {
      src: addressIconSrc,
      alt: 'shipping icon',
      class: 'address-icon',
      id: 'shipping-address',
    });

    addressIconSrc = this.buttons.getAddressIconSrc('billing');
    const addressIconBilling = HTMLCreator.createElement('img', {
      src: addressIconSrc,
      alt: 'billing icon',
      class: 'address-icon',
      id: 'billing-address',
    });

    const streetInput = HTMLCreator.createElement('input', {
      type: 'text',
      id: 'street',
      name: 'street',
      class: 'input-street',
      placeholder: 'street',
    }) as HTMLInputElement;

    const cityInput = HTMLCreator.createElement('input', {
      type: 'text',
      id: 'city',
      name: 'city',
      class: 'input-city',
      placeholder: 'city',
    }) as HTMLInputElement;

    const postalCodeInput = HTMLCreator.createElement('input', {
      type: 'text',
      id: 'postalCode',
      name: 'postalCode',
      class: 'input-code',
      placeholder: 'postal code',
    }) as HTMLInputElement;

    const countryInput = HTMLCreator.createElement('input', {
      type: 'text',
      id: 'country',
      name: 'country',
      class: 'input-country',
      placeholder: 'select one country',
      required: 'true',
      list: 'countryList',
    }) as HTMLInputElement;

    const form = HTMLCreator.createElement('form', { class: 'new-address-form' }, [
      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'street' }, ['Street:']),
        streetInput,
        createResetButton(streetInput),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'city' }, ['City:']),
        cityInput,
        createResetButton(cityInput),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'postalCode' }, ['Postal Code:']),
        postalCodeInput,
        createResetButton(postalCodeInput),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'country' }, ['Country:']),
        countryInput,
        this.renderDatalist(),
        createResetButton(countryInput),
      ]),

      HTMLCreator.createElement('div', { class: 'billing-shipping-icons-container' }, [
        addressIconBilling,
        addressIconShipping,
        HTMLCreator.createElement('img', {
          class: 'address-icon address-clicked',
          src: generalAddressIconSrc,
          alt: 'general address icon',
          id: 'general-address',
        }),
      ]),

      HTMLCreator.createElement('div', { class: 'checkbox-container' }, [
        HTMLCreator.createElement('input', {
          type: 'checkbox',
          id: 'defaultAddress',
          name: 'defaultAddress',
          class: 'custom-checkbox',
        }),
        HTMLCreator.createElement('label', { for: 'defaultAddress', class: 'custom-label' }, ['Set as default']),
      ]),

      HTMLCreator.createElement('div', {}, [this.buttons.renderSubmitButton()]),
    ]) as HTMLFormElement;

    const closeButton = this.buttons.renderCloseButton();

    const formContainer = HTMLCreator.createElement('div', { class: 'new-address-form-container' }, [
      form,
      closeButton,
    ]);

    closeButton.addEventListener('click', () => {
      const addressesSection = document.querySelector('.addresses-section') as HTMLElement;
      if (addressesSection) {
        addressesSection.removeChild(formContainer);
        this.buttons.removeInactivityOfNewAddressButton();
      }
    });

    return formContainer;
  }

  renderDatalist() {
    const countries = ['United States', 'Germany', 'Italy'];
    const options = countries.map((country) => HTMLCreator.createElement('option', { value: country }));
    return HTMLCreator.createElement('datalist', { id: 'countryList' }, options);
  }
}
