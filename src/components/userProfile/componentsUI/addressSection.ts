import iso3166 from 'iso-3166-1-alpha-2';
import { Address } from '@commercetools/platform-sdk';
import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';
import germanyFlag from '../../../assets/germany.png';
import usaFlag from '../../../assets/usa.svg';
import italyFlag from '../../../assets/italy.png';

export default class AddressSection {
  private buttons: Buttons;

  private address: Address | null = null;

  constructor() {
    this.buttons = new Buttons();
  }

  renderAddressSection(address: Address, addressType: string, isDefault: boolean) {
    this.address = address;

    const billingAddressIconSrc = this.buttons.getAddressIconSrc('billing');
    const billingAddressIcon = HTMLCreator.createElement('img', {
      src: billingAddressIconSrc,
      alt: `billing icon`,
      class: 'address-icon',
      title: 'Billing address',
    });

    const shippingAddressIconSrc = this.buttons.getAddressIconSrc('shipping');
    const shippingAddressIcon = HTMLCreator.createElement('img', {
      src: shippingAddressIconSrc,
      alt: `shipping icon`,
      class: 'address-icon',
      title: 'Shipping address',
    });

    const deleteButton = this.buttons.renderDeleteButton();
    const editButton = this.buttons.renderEditButton();

    const addressesIconsDiv = HTMLCreator.createElement('div', {}, [
      billingAddressIcon,
      shippingAddressIcon,
      editButton,
    ]);

    if (addressType === 'billing') {
      billingAddressIcon.classList.add('address-clicked');
    } else if (addressType === 'shipping') {
      shippingAddressIcon.classList.add('address-clicked');
    } else if (addressType === 'general') {
      billingAddressIcon.classList.add('address-clicked');
      shippingAddressIcon.classList.add('address-clicked');
    }

    const deleteIconDiv = HTMLCreator.createElement('div', {});

    const addressIconsContainer = HTMLCreator.createElement('div', { class: 'address-icons-container' }, [
      addressesIconsDiv,
      deleteIconDiv,
    ]);

    if (isDefault) {
      const defaultText = HTMLCreator.createElement('h3', { class: 'default-text' }, ['Default']);
      deleteIconDiv.appendChild(defaultText);
    }

    deleteIconDiv.appendChild(deleteButton);

    const addressLines = [
      HTMLCreator.createElement('p', {}, [`Street: ${address.streetName}`]),
      HTMLCreator.createElement('p', {}, [`City: ${address.city}`]),
      HTMLCreator.createElement('p', {}, [`Postal Code: ${address.postalCode}`]),
      HTMLCreator.createElement('p', { class: 'country' }, [
        `Country: ${this.getFullNameOfCountry(address.country)}`,
        HTMLCreator.createElement('img', {
          src: this.getFlagSrc(address.country),
          alt: `${address.country} flag`,
          class: 'country-flag',
        }),
      ]),
    ];

    const addressEntry = HTMLCreator.createElement('div', { class: 'address-entry hidden' }, [
      addressIconsContainer,
      ...addressLines,
    ]);

    return addressEntry;
  }

  getFullNameOfCountry(country: string) {
    const countryName = iso3166.getCountry(country);
    return countryName;
  }

  getFlagSrc(countryCode: string): string {
    const flagMap: { [key: string]: string } = {
      IT: italyFlag,
      US: usaFlag,
      DE: germanyFlag,
    };
    return flagMap[countryCode];
  }

  returnAddress() {
    return this.address;
  }
}
