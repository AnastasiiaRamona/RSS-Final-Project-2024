import { Address } from '@commercetools/platform-sdk';
import iso3166 from 'iso-3166-1-alpha-2';
import HTMLCreator from '../HTMLCreator';
import UserProfileController from './userProfileController';

export default class UserProfile {
  controller: UserProfileController;

  private email: string | undefined = undefined;

  private password: string | undefined = undefined;

  private firstName: string | undefined = undefined;

  private lastName: string | undefined = undefined;

  private dateOfBirth: string | undefined = undefined;

  private addresses: Address[] | undefined = undefined;

  private shippingAddress: Address | undefined = undefined;

  private billingAddress: Address | undefined = undefined;

  private isBillingAddressIsDefault: boolean = false;

  private isShippingAddressIsDefault: boolean = false;

  constructor() {
    this.controller = new UserProfileController();
  }

  async getCustomerData() {
    const customerData = await this.controller.getCustomerById();
    if (customerData) {
      this.email = customerData.email;
      this.password = customerData.password;
      this.firstName = customerData.firstName;
      this.lastName = customerData.lastName;
      this.dateOfBirth = customerData.dateOfBirth;
      this.addresses = customerData.addresses;

      this.billingAddress = this.addresses?.find(
        (address) =>
          address.id ===
          (Array.isArray(customerData.billingAddressId)
            ? customerData.billingAddressId[0]
            : customerData.billingAddressId)
      );

      console.log(this.billingAddress);

      this.shippingAddress = this.addresses?.find(
        (address) =>
          address.id ===
          (Array.isArray(customerData.shippingAddressId)
            ? customerData.shippingAddressId[0]
            : customerData.shippingAddressId)
      );

      this.isBillingAddressIsDefault =
        customerData.defaultBillingAddressId ===
        (Array.isArray(customerData.billingAddressId)
          ? customerData.billingAddressId[0]
          : customerData.billingAddressId);

      this.isShippingAddressIsDefault =
        customerData.defaultShippingAddressId ===
        (Array.isArray(customerData.shippingAddressId)
          ? customerData.shippingAddressId[0]
          : customerData.shippingAddressId);
    }
  }

  async renderPage() {
    await this.getCustomerData();
    if (this.dateOfBirth) {
      this.dateOfBirth = this.formatDate(this.dateOfBirth);
    }
    const profileContainer = HTMLCreator.createElement('div', { class: 'profile-container' }, []);

    const personalInfoSection = HTMLCreator.createElement('div', { class: 'personal-info-section' }, [
      HTMLCreator.createElement('h2', {}, ['Personal Information']),
      HTMLCreator.createElement('p', {}, [`Email: ${this.email}`]),
      HTMLCreator.createElement('p', {}, [`Password`]),
      HTMLCreator.createElement('p', {}, [`First Name: ${this.firstName}`]),
      HTMLCreator.createElement('p', {}, [`Last Name: ${this.lastName}`]),
      HTMLCreator.createElement('p', {}, [`Date of Birth: ${this.dateOfBirth}`]),
    ]);

    const toggleButton = HTMLCreator.createElement('div', { class: 'toggle-button' });

    const addressesSection = HTMLCreator.createElement('div', { class: 'addresses-section' }, [
      HTMLCreator.createElement('h2', {}, ['Saved Addresses', toggleButton]),
      ...(this.addresses || []).map((address) => {
        let addressIcon: HTMLElement | null = null;
        if (this.billingAddress && address.id === this.billingAddress.id) {
          const addressIconSrc = this.getAddressIconSrc('billing');
          addressIcon = HTMLCreator.createElement('img', {
            src: addressIconSrc,
            alt: `billing icon`,
            class: 'address-icon',
          });
        } else if (this.shippingAddress && address.id === this.shippingAddress.id) {
          const addressIconSrc = this.getAddressIconSrc('shipping');
          addressIcon = HTMLCreator.createElement('img', {
            src: addressIconSrc,
            alt: `shipping icon`,
            class: 'address-icon',
          });
        }

        const addressIconsContainer = HTMLCreator.createElement('div', { class: 'address-icons-container' });
        if (addressIcon) {
          addressIconsContainer.appendChild(addressIcon);
        }

        if (
          (this.isBillingAddressIsDefault && this.billingAddress && address.id === this.billingAddress.id) ||
          (this.isShippingAddressIsDefault && this.shippingAddress && address.id === this.shippingAddress.id)
        ) {
          const defaultText = HTMLCreator.createElement('h3', { class: 'default-text' }, ['Default']);
          addressIconsContainer.appendChild(defaultText);
        }

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

        return HTMLCreator.createElement('div', { class: 'address-entry hidden' }, [
          addressIconsContainer,
          ...addressLines,
        ]);
      }),
    ]);

    profileContainer.appendChild(personalInfoSection);
    profileContainer.appendChild(addressesSection);

    const main = HTMLCreator.createElement('main', { class: 'profile-user-main' }, [profileContainer]);
    return main;
  }

  formatDate(date: string) {
    const dateObject = new Date(date);
    const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : `${dateObject.getMonth() + 1}`;
    const formattedDate = `${dateObject.getDate()}.${month}.${dateObject.getFullYear()}`;
    return formattedDate;
  }

  getFullNameOfCountry(country: string) {
    const countryName = iso3166.getCountry(country);
    return countryName;
  }

  getFlagSrc(countryCode: string): string {
    const flagMap: { [key: string]: string } = {
      IT: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png',
      US: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
      DE: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png',
    };
    return flagMap[countryCode];
  }

  getAddressIconSrc(addressType: string): string {
    const iconMap: { [key: string]: string } = {
      shipping: 'https://cdn0.iconfinder.com/data/icons/pinpoint-interface/48/address-shipping-512.png',
      billing: 'https://cdn3.iconfinder.com/data/icons/pinpoint-interface/48/address-billing-512.png',
    };
    return iconMap[addressType];
  }

  addEventListeners() {
    const toggleButton = document.querySelector('.toggle-button');
    let isRotated = false;

    toggleButton?.addEventListener('click', () => {
      isRotated = !isRotated;
      toggleButton.classList.toggle('rotate', isRotated);

      const addressEntry = document.querySelectorAll('.address-entry');
      addressEntry.forEach((entry) => {
        entry.classList.toggle('hidden', !isRotated);
      });
    });
  }
}
