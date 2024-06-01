import { Address } from '@commercetools/platform-sdk';
import HTMLCreator from '../HTMLCreator';
import UserProfileController from './userProfileController';
import germanyFlag from '../../assets/germany.png';
import usaFlag from '../../assets/usa.svg';
import italyFlag from '../../assets/italy.png';
import PersonalInfoSection from './componentsUI/personalInfoSection';
import ChangePasswordForm from './componentsUI/changePasswordForm';
import Buttons from './componentsUI/buttons';
import NewAddressForm from './componentsUI/newAddressForm';
import SecuritySettingsSection from './componentsUI/securitySettingsSection';

export default class UserProfile {
  controller: UserProfileController;

  private version: number | undefined = undefined;

  private email: string | undefined = undefined;

  private firstName: string | undefined = undefined;

  private lastName: string | undefined = undefined;

  private dateOfBirth: string | undefined = undefined;

  private addresses: Address[] | undefined = undefined;

  private shippingAddress: Address | undefined = undefined;

  private billingAddress: Address | undefined = undefined;

  private isBillingAddressIsDefault: boolean = false;

  private isShippingAddressIsDefault: boolean = false;

  private personalInfoSection: PersonalInfoSection;

  private changePasswordForm: ChangePasswordForm;

  private newAddressForm: NewAddressForm;

  private securitySettingsSection: SecuritySettingsSection;

  private buttons: Buttons;

  constructor() {
    this.controller = new UserProfileController();
    this.personalInfoSection = new PersonalInfoSection();
    this.changePasswordForm = new ChangePasswordForm();
    this.newAddressForm = new NewAddressForm();
    this.securitySettingsSection = new SecuritySettingsSection();
    this.buttons = new Buttons();
  }

  async getCustomerData() {
    const customerData = await this.controller.getCustomerById();
    if (customerData && customerData.dateOfBirth) {
      this.email = customerData.email;
      this.firstName = customerData.firstName;
      this.lastName = customerData.lastName;
      this.dateOfBirth = this.controller.formatDate(customerData.dateOfBirth);
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

    if (this.email && this.firstName && this.lastName && this.dateOfBirth) {
      const personalInfoSection = this.personalInfoSection.renderPersonalInfoSection(
        this.email,
        this.firstName,
        this.lastName,
        this.dateOfBirth
      );

      const securitySettingSection = this.securitySettingsSection.renderSecuritySettingsSection();

      const toggleButton = HTMLCreator.createElement('div', { class: 'toggle-button' });

      const addNewAddressButton = this.buttons.renderAddNewAddressButton();

      const addressesSection = HTMLCreator.createElement('div', { class: 'addresses-section' }, [
        HTMLCreator.createElement('h2', { class: 'saved-addresses-title' }, ['Saved Addresses', toggleButton]),
        ...(this.addresses || []).map((address) => {
          let addressIcon: HTMLElement | null = null;
          if (this.billingAddress && address.id === this.billingAddress.id) {
            const addressIconSrc = this.buttons.getAddressIconSrc('billing');
            addressIcon = HTMLCreator.createElement('img', {
              src: addressIconSrc,
              alt: `billing icon`,
              class: 'address-icon',
            });
          } else if (this.shippingAddress && address.id === this.shippingAddress.id) {
            const addressIconSrc = this.buttons.getAddressIconSrc('shipping');
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
              `Country: ${this.controller.getFullNameOfCountry(address.country)}`,
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

      addressesSection.appendChild(addNewAddressButton);

      profileContainer.appendChild(personalInfoSection);
      profileContainer.appendChild(securitySettingSection);
      profileContainer.appendChild(addressesSection);
    }
    const main = HTMLCreator.createElement('main', { class: 'profile-user-main' }, [profileContainer]);
    return main;
  }

  getFlagSrc(countryCode: string): string {
    const flagMap: { [key: string]: string } = {
      IT: italyFlag,
      US: usaFlag,
      DE: germanyFlag,
    };
    return flagMap[countryCode];
  }

  addEventListeners() {
    const toggleButton = document.querySelector('.toggle-button');
    let isRotated = false;
    const addressEntries = document.querySelectorAll('.address-entry');

    toggleButton?.addEventListener('click', () => {
      isRotated = !isRotated;
      toggleButton.classList.toggle('rotate', isRotated);

      // const savedAddressesTitle = document.querySelector('.saved-addresses-title');

      const addNewAddressButton = document.querySelector('.add-new-address-button');

      addressEntries.forEach((entry) => {
        entry.classList.toggle('hidden', !isRotated);
      });

      addNewAddressButton?.classList.toggle('hidden', !isRotated);

      // if (isRotated && savedAddressesTitle) {
      //   const editButton = this.renderEditButton();
      //   // this.addEventListenerToTheEditButton(editButton, addressEntries[0], addressEntries[1]);
      //   savedAddressesTitle.appendChild(editButton);
      // } else if (savedAddressesTitle) {
      //   const editButton = savedAddressesTitle.querySelector('.edit-button');
      //   if (editButton) {
      //     savedAddressesTitle.removeChild(editButton);
      //   }
      // }
    });

    const editButton = document.querySelector('.edit-button') as HTMLElement;
    const personalInfoSection = document.querySelector('.personal-info-section') as HTMLElement;
    if (editButton) {
      this.addEventListenerToTheEditButton(editButton, personalInfoSection);
    }

    const changePasswordButton = document.querySelector('.change-password-button') as HTMLButtonElement;
    const securitySettingsSection = document.querySelector('.security-settings-section') as HTMLElement;
    if (changePasswordButton && securitySettingsSection) {
      changePasswordButton.addEventListener('click', () => {
        const changePasswordForm = this.changePasswordForm.renderChangePasswordForm();
        this.addEventListenerToTheChangePasswordForm(changePasswordForm);
        securitySettingsSection.replaceChild(changePasswordForm, changePasswordButton);
      });
    }

    const addNewAddressButton = document.querySelector('.add-new-address-button') as HTMLButtonElement;
    const addressesSection = document.querySelector('.addresses-section') as HTMLElement;
    if (addNewAddressButton && addressesSection) {
      addNewAddressButton.addEventListener('click', () => {
        const addNewAddressForm = this.newAddressForm.renderAddAddressForm();
        addressesSection.insertBefore(addNewAddressForm, addNewAddressButton);
      });
    }
  }

  addEventListenerToTheEditButton(editButton: HTMLElement, container: Element, secondContainer?: Element) {
    editButton.addEventListener('click', () => {
      if (editButton.classList.contains('clicked-icon')) {
        editButton.classList.remove('clicked-icon');
        const personalInfoSection = container;
        if (this.email && this.firstName && this.lastName && this.dateOfBirth) {
          personalInfoSection.innerHTML = this.personalInfoSection.renderPersonalInfoSection(
            this.email,
            this.firstName,
            this.lastName,
            this.dateOfBirth
          ).innerHTML;
        }
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

      const resetButton = this.buttons.renderResetButton();
      const submitButton = this.buttons.renderSubmitButton();

      resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        input.value = '';
        const inputEvent = new Event('input', { bubbles: true });
        input.dispatchEvent(inputEvent);
      });

      submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        this.controller.checkValidatePersonalInformation(form);
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

  addEventListenerToTheChangePasswordForm(form: HTMLFormElement) {
    this.controller.checkValidatePassword(form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const currentPasswordInput = form.querySelector('#current-password') as HTMLInputElement;
      const newPasswordInput = form.querySelector('#new-password') as HTMLInputElement;

      if (this.version && this.email) {
        try {
          await this.controller.changeUserPassword(
            this.version,
            currentPasswordInput.value,
            newPasswordInput.value,
            this.email
          );
          await this.getCustomerData();
          this.renderSuccessfulMessage(form);
          currentPasswordInput.value = '';
          newPasswordInput.value = '';
        } catch (error) {
          console.log('Error:', error);
        }
      }
    });
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
