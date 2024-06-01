import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';
import generalAddressIconSrc from '../../../assets/address-icon.png';

export default class NewAddressForm {
  private buttons: Buttons;

  constructor() {
    this.buttons = new Buttons();
  }

  renderAddAddressForm() {
    let addressIconSrc = this.buttons.getAddressIconSrc('shipping');
    const addressIconShipping = HTMLCreator.createElement('img', {
      src: addressIconSrc,
      alt: `shipping icon`,
      class: 'address-icon',
    });

    addressIconSrc = this.buttons.getAddressIconSrc('billing');
    const addressIconBilling = HTMLCreator.createElement('img', {
      src: addressIconSrc,
      alt: `billing icon`,
      class: 'address-icon',
    });

    const form = HTMLCreator.createElement('form', { class: 'new-address-form' }, [
      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'street' }, ['Street:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          id: 'street',
          name: 'street',
          class: 'input-street',
          placeholder: 'street',
        }),
        this.buttons.renderResetButton(),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'city' }, ['City:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          id: 'city',
          name: 'city',
          class: 'input-city',
          placeholder: 'city',
        }),
        this.buttons.renderResetButton(),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'postalCode' }, ['Postal Code:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          id: 'postalCode',
          name: 'postalCode',
          class: 'input-code',
          placeholder: 'postal code',
        }),
        this.buttons.renderResetButton(),
      ]),

      HTMLCreator.createElement('div', {}, [
        HTMLCreator.createElement('label', { for: 'country' }, ['Country:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          id: 'country',
          name: 'country',
          class: 'input-country',
          placeholder: 'select one country',
          required: 'true',
          list: 'countryList',
        }),
        this.renderDatalist(),
        this.buttons.renderResetButton(),
      ]),

      HTMLCreator.createElement('div', { class: 'billing-shipping-icons-container' }, [
        addressIconBilling,
        addressIconShipping,
        HTMLCreator.createElement('img', {
          class: 'address-icon',
          src: generalAddressIconSrc,
          alt: 'general address icon',
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
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
    });

    return formContainer;
  }

  renderDatalist() {
    const countries = ['United States', 'Germany', 'Italy'];
    const options = countries.map((country) => HTMLCreator.createElement('option', { value: country }));
    return HTMLCreator.createElement('datalist', { id: 'countryList' }, options);
  }
}
