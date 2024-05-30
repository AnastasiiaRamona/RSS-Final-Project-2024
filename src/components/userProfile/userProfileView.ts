import { Address } from '@commercetools/platform-sdk';
import iso3166 from 'iso-3166-1-alpha-2';
import HTMLCreator from '../HTMLCreator';
import UserProfileController from './userProfileController';
import editIcon from '../../assets/edit.svg';

export default class UserProfile {
  controller: UserProfileController;

  private version: number | undefined = undefined;

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
    if (customerData && customerData.dateOfBirth) {
      this.email = customerData.email;
      this.password = customerData.password;
      this.firstName = customerData.firstName;
      this.lastName = customerData.lastName;
      this.dateOfBirth = this.formatDate(customerData.dateOfBirth);
      this.addresses = customerData.addresses;
      this.version = customerData.version;

      this.billingAddress = this.addresses?.find(
        (address) =>
          address.id ===
          (Array.isArray(customerData.billingAddressId)
            ? customerData.billingAddressId[0]
            : customerData.billingAddressId)
      );

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

    const profileContainer = HTMLCreator.createElement('div', { class: 'profile-container' }, []);

    const personalInfoSection = this.renderPersonalInfoSection();

    const toggleButton = HTMLCreator.createElement('div', { class: 'toggle-button' });

    const addressesSection = HTMLCreator.createElement('div', { class: 'addresses-section' }, [
      HTMLCreator.createElement('h2', { class: 'saved-addresses-title' }, ['Saved Addresses', toggleButton]),
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

  renderPersonalInfoSection() {
    const editPersonalButton = this.renderEditButton();
    const personalInfoSection = HTMLCreator.createElement('div', { class: 'personal-info-section' }, [
      HTMLCreator.createElement('h2', {}, ['Personal Information', editPersonalButton]),
      HTMLCreator.createElement('p', {}, [`Email: ${this.email}`]),
      HTMLCreator.createElement('p', {}, [`First Name: ${this.firstName}`]),
      HTMLCreator.createElement('p', {}, [`Last Name: ${this.lastName}`]),
      HTMLCreator.createElement('p', {}, [`Date of Birth: ${this.dateOfBirth}`]),
    ]);
    return personalInfoSection;
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
    const addressEntries = document.querySelectorAll('.address-entry');

    toggleButton?.addEventListener('click', () => {
      isRotated = !isRotated;
      toggleButton.classList.toggle('rotate', isRotated);

      const savedAddressesTitle = document.querySelector('.saved-addresses-title');

      addressEntries.forEach((entry) => {
        entry.classList.toggle('hidden', !isRotated);
      });

      if (isRotated && savedAddressesTitle) {
        const editButton = this.renderEditButton();
        // this.addEventListenerToTheEditButton(editButton, addressEntries[0], addressEntries[1]);
        savedAddressesTitle.appendChild(editButton);
      } else if (savedAddressesTitle) {
        const editButton = savedAddressesTitle.querySelector('.edit-button');
        if (editButton) {
          savedAddressesTitle.removeChild(editButton);
        }
      }
    });

    const editButton = document.querySelector('.edit-button') as HTMLElement;
    const personalInfoSection = document.querySelector('.personal-info-section') as HTMLElement;
    if (editButton) {
      this.addEventListenerToTheEditButton(editButton, personalInfoSection);
    }
  }

  renderEditButton() {
    const editButton = HTMLCreator.createElement('img', { class: 'edit-button', src: editIcon, alt: 'edit button' });
    return editButton;
  }

  addEventListenerToTheEditButton(editButton: HTMLElement, container: Element, secondContainer?: Element) {
    editButton.addEventListener('click', () => {
      if (editButton.classList.contains('clicked-icon')) {
        editButton.classList.remove('clicked-icon');
        const personalInfoSection = container;
        personalInfoSection.innerHTML = this.renderPersonalInfoSection().innerHTML;
        this.reassignEvents(container);
      } else {
        editButton.classList.add('clicked-icon');
        this.toggleEditMode(container);
        if (secondContainer) {
          this.toggleEditMode(secondContainer);
        }
      }
    });
  }

  toggleEditMode(element: Element) {
    const paragraphs = element.querySelectorAll('p');
    const inputClasses = ['input-mail', 'input-username', 'input-surname', 'input-date'];

    paragraphs.forEach((paragraph: HTMLElement, index: number) => {
      const paragraphText = paragraph.textContent || '';
      const splittedText = paragraphText.split(':');
      const text = splittedText.length > 1 ? splittedText[1].trim() : '';

      const form = HTMLCreator.createElement('form', { class: 'personal-info-form' }) as HTMLFormElement;
      const input = HTMLCreator.createElement('input', { type: 'text', value: text }) as HTMLInputElement;
      if (index < inputClasses.length) {
        input.classList.add(inputClasses[index]);
      }

      const resetButton = HTMLCreator.createElement('input', {
        type: 'image',
        class: 'reset-img',
        src: 'https://cdn-icons-png.freepik.com/512/2618/2618245.png',
      });

      const submitButton = HTMLCreator.createElement('input', {
        class: 'submit-img',
        type: 'image',
        src: 'https://icons.iconarchive.com/icons/icons8/windows-8/256/Very-Basic-Ok-icon.png',
      });

      resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        input.value = '';
        const inputEvent = new Event('input', { bubbles: true });
        input.dispatchEvent(inputEvent);
      });

      submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        this.controller.checkValidate(form);
        if (form.reportValidity()) {
          const changedParagraph = paragraph;
          changedParagraph.textContent = input.value;

          const id = this.controller.getID();
          if (id && this.version) {
            try {
              switch (index) {
                case 0:
                  this.email = input.value;
                  await this.controller.updateEmail(this.version, id, this.email);
                  break;
                case 1:
                  this.firstName = input.value;
                  await this.controller.updateFirstName(this.version, id, this.firstName);
                  break;
                case 2:
                  this.lastName = input.value;
                  await this.controller.updateLastName(this.version, id, this.lastName);
                  break;
                case 3:
                  this.dateOfBirth = input.value;
                  await this.controller.updateDateOfBirth(
                    this.version,
                    id,
                    this.controller.parseDateString(this.dateOfBirth)
                  );
                  break;
                default:
                  break;
              }
              await this.getCustomerData();
              this.renderSuccessfulMessage(form);
            } catch (error) {
              console.log('Error updating data:', error);
            }
          }
        }
      });

      form.appendChild(input);
      form.appendChild(resetButton);
      form.appendChild(submitButton);

      paragraph.replaceWith(form);
    });
  }

  reassignEvents(container: Element) {
    const newEditButton = container.querySelector('.edit-button') as HTMLElement;
    if (newEditButton) {
      this.addEventListenerToTheEditButton(newEditButton, container);
    }
  }

  renderSuccessfulMessage(form: HTMLFormElement) {
    const existingElement = document.querySelector('.success-text-input') as HTMLInputElement;

    const successTextInput = HTMLCreator.createElement('span', { class: 'success-text-input' }, [
      'The changes were successfully saved.',
    ]);

    if (existingElement) {
      form.replaceChild(successTextInput, existingElement);
    } else {
      form.appendChild(successTextInput);
    }
    setTimeout(() => {
      if (form.contains(successTextInput)) {
        form.removeChild(successTextInput);
      }
    }, 5000);
  }
}
