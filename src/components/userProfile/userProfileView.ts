import { Address } from '@commercetools/platform-sdk';
import iso3166 from 'iso-3166-1';
import HTMLCreator from '../HTMLCreator';
import UserProfileController from './userProfileController';
import PersonalInfoSection from './componentsUI/personalInfoSection';
import ChangePasswordForm from './componentsUI/changePasswordForm';
import Buttons from './componentsUI/buttons';
import NewAddressForm from './componentsUI/newAddressForm';
import SecuritySettingsSection from './componentsUI/securitySettingsSection';
import AddressSection from './componentsUI/addressSection';

export default class UserProfile {
  controller: UserProfileController;

  private version: number | undefined = undefined;

  private email: string | undefined = undefined;

  private firstName: string | undefined = undefined;

  private lastName: string | undefined = undefined;

  private dateOfBirth: string | undefined = undefined;

  private addresses: Address[] | undefined = undefined;

  private billingAddressIds: string[] | undefined = undefined;

  private shippingAddressIds: string[] | undefined = undefined;

  private defaultBillingAddressId: string | undefined = undefined;

  private defaultShippingAddressId: string | undefined = undefined;

  private personalInfoSection: PersonalInfoSection;

  private changePasswordForm: ChangePasswordForm;

  private newAddressForm: NewAddressForm;

  private securitySettingsSection: SecuritySettingsSection;

  private buttons: Buttons;

  private addressSection: AddressSection;

  constructor() {
    this.controller = new UserProfileController();
    this.personalInfoSection = new PersonalInfoSection();
    this.changePasswordForm = new ChangePasswordForm();
    this.newAddressForm = new NewAddressForm();
    this.securitySettingsSection = new SecuritySettingsSection();
    this.addressSection = new AddressSection();
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
      this.billingAddressIds = customerData.billingAddressIds;
      this.shippingAddressIds = customerData.shippingAddressIds;
      this.defaultBillingAddressId = customerData.defaultBillingAddressId;
      this.defaultShippingAddressId = customerData.defaultShippingAddressId;
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

      const addressesSection = this.renderAddressesSection();

      profileContainer.appendChild(personalInfoSection);
      profileContainer.appendChild(securitySettingSection);
      profileContainer.appendChild(addressesSection);
    }
    const main = HTMLCreator.createElement('main', { class: 'profile-user-main' }, [profileContainer]);
    return main;
  }

  renderAddressesSection() {
    const toggleButton = HTMLCreator.createElement('div', { class: 'toggle-button' });

    const addNewAddressButton = this.buttons.renderAddNewAddressButton();

    const addressesSection = HTMLCreator.createElement('div', { class: 'addresses-section' }, [
      HTMLCreator.createElement('h2', { class: 'saved-addresses-title' }, ['Saved Addresses', toggleButton]),
    ]);

    if (this.addresses && this.billingAddressIds && this.shippingAddressIds) {
      this.addresses.forEach((address) => {
        const { addressType, isDefault } = this.returnAddressType(address);

        const addressEntry = this.addressSection.renderAddressSection(address, addressType, isDefault);

        addressesSection.appendChild(addressEntry);
      });
    }

    addressesSection.appendChild(addNewAddressButton);
    return addressesSection;
  }

  returnAddressType(address: Address) {
    let addressType: string;
    let isDefault: boolean = false;

    if (address.id && this.billingAddressIds?.includes(address.id) && this.shippingAddressIds?.includes(address.id)) {
      addressType = 'general';
    } else if (address.id && this.billingAddressIds?.includes(address.id)) {
      addressType = 'billing';
    } else if (address.id && this.shippingAddressIds?.includes(address.id)) {
      addressType = 'shipping';
    } else {
      addressType = 'unknown';
    }

    if (
      (addressType === 'billing' && address.id === this.defaultBillingAddressId) ||
      (addressType === 'shipping' && address.id === this.defaultShippingAddressId)
    ) {
      isDefault = true;
    }

    if (
      addressType === 'general' &&
      address.id === this.defaultBillingAddressId &&
      address.id === this.defaultShippingAddressId
    ) {
      isDefault = true;
    }
    return { addressType, isDefault };
  }

  addEventListeners() {
    this.addEventListenerToTheToggleButton();

    this.addEventListenerToTheEditForms();

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
    const addressesSectionElement = document.querySelector('.addresses-section') as HTMLElement;
    if (addNewAddressButton && addressesSectionElement) {
      addNewAddressButton.addEventListener('click', () => {
        const newAddressFormContainer = this.newAddressForm.renderNewAddressForm();
        const closeButton = newAddressFormContainer.querySelector('.close-icon-img') as HTMLElement;
        this.newAddressForm.addEventListenerToTheCloseButton(closeButton, newAddressFormContainer);
        addressesSectionElement.insertBefore(newAddressFormContainer, addNewAddressButton);
        this.buttons.addInactivityOfNewAddressButton();
        this.buttons.addInactivityOfEditButtons();
        const newAddressForm = document.querySelector('.new-address-form') as HTMLFormElement;
        this.addEventListenerToTheNewAddressForm(newAddressForm);
      });
    }

    const id = this.controller.getID();

    const deleteButtons = document.querySelectorAll('.delete-img') as NodeListOf<HTMLElement>;
    deleteButtons.forEach((deleteButton, i) => {
      deleteButton.addEventListener('click', async () => {
        await this.getCustomerData();
        if (this.addresses && this.version && id) {
          const address = this.addresses[i];
          const addressId = address.id;
          if (addressId) {
            await this.controller.removeAddress(this.version, id, addressId);
            await this.getCustomerData();

            const buttonContainer = deleteButton.parentElement;
            const addressItem = buttonContainer?.parentElement;
            const addressContainer = addressItem?.parentElement;
            const addressesSection = document.querySelector('.addresses-section') as HTMLElement;

            if (addressContainer) {
              addressesSection.removeChild(addressContainer);
            }
          }
        }
      });
    });
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

  addEventListenerToTheChangePasswordForm(form: HTMLFormElement) {
    this.controller.checkValidationPassword(form);

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

  addEventListenerToTheNewAddressForm(form: HTMLFormElement) {
    this.newAddressForm.addEventListenersToTheIconsContainer();

    const id = this.controller.getID();

    this.controller.checkValidationAddress(form);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const newStreetName = (document.querySelector('.new-address-form .input-street') as HTMLInputElement).value;
      const newCity = (document.querySelector('.new-address-form .input-city') as HTMLInputElement).value;
      const newPostalCode = (document.querySelector('.new-address-form .input-code') as HTMLInputElement).value;
      const newCountry = (document.querySelector('.new-address-form .input-country') as HTMLInputElement).value;
      let inputCountryCode = iso3166.whereCountry(newCountry)?.alpha2 || 'UNDEFINED';
      if (newCountry === 'United States') {
        inputCountryCode = 'US';
      }

      let addressType;
      let isDefault: boolean = false;
      const iconsAddressContainer = document.querySelector('.billing-shipping-icons-container') as HTMLElement;

      if (this.version && id) {
        await this.controller.addNewAddress(this.version, id, newStreetName, newPostalCode, newCity, inputCountryCode);
        await this.getCustomerData();
        if (this.addresses) {
          const lastAddressId = this.addresses[this.addresses.length - 1]?.id;
          const allImages = iconsAddressContainer.querySelectorAll('img');
          for (const img of allImages) {
            if (img.classList.contains('address-clicked') && this.version && lastAddressId) {
              if (img.id === 'billing-address') {
                await this.controller.setBillingAddress(this.version, id, lastAddressId);
                await this.getCustomerData();
                addressType = 'billing';
                isDefault = await this.checkDefaultAddress(this.version, id, lastAddressId, 'billing');
              } else if (img.id === 'shipping-address') {
                await this.controller.setShippingAddress(this.version, id, lastAddressId);
                await this.getCustomerData();
                isDefault = await this.checkDefaultAddress(this.version, id, lastAddressId, 'shipping');
                addressType = 'shipping';
              } else if (img.id === 'general-address') {
                await this.controller.setBillingAddress(this.version, id, lastAddressId);
                await this.getCustomerData();
                await this.controller.setShippingAddress(this.version, id, lastAddressId);
                await this.getCustomerData();
                isDefault = await this.checkDefaultAddress(this.version, id, lastAddressId, 'general');
                addressType = 'general';
              }
            }
          }
          this.renderSuccessfulMessage(form);
          const addressesSection = document.querySelector('.addresses-section') as HTMLElement;
          const newAddressFormContainer = document.querySelector('.new-address-form-container') as HTMLElement;
          if (addressType && this.addresses) {
            if (addressesSection.contains(newAddressFormContainer)) {
              const newAddressEmpty = this.addressSection.renderAddressSection(
                this.addresses[this.addresses.length - 1],
                addressType,
                isDefault
              );
              this.addEventListenerToTheToggleButtonOfElement(newAddressEmpty);
              newAddressEmpty.classList.remove('hidden');
              addressesSection.replaceChild(newAddressEmpty, newAddressFormContainer);
              const deleteButton = newAddressEmpty.querySelector('.delete-img');
              deleteButton?.addEventListener('click', async () => {
                await this.getCustomerData();
                if (this.addresses && this.version && id) {
                  const addressId = this.addresses[this.addresses.length - 1].id;
                  if (addressId) {
                    await this.controller.removeAddress(this.version, id, addressId);
                    await this.getCustomerData();
                    addressesSection.removeChild(newAddressEmpty);
                  }
                }
              });
              this.buttons.removeInactivityOfNewAddressButton();
              this.buttons.addActivityOfEditButtons();
              this.addEventListenerToTheEditForm(newAddressEmpty, this.addresses.length - 1);
            } else {
              console.log('newAddressFormContainer is not a child of addressesSection');
            }
          }
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
        this.controller.checkValidationPersonalInformation(form);
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

  async checkDefaultAddress(version: number, id: string, lastAddressId: string, type: string) {
    const defaultCheckbox = document.querySelector('#defaultAddress') as HTMLInputElement;
    if (defaultCheckbox && defaultCheckbox.checked) {
      await this.getCustomerData();
      if (type === 'billing') {
        await this.controller.setDefaultBillingAddress(version, id, lastAddressId);
      } else if (type === 'shipping') {
        await this.controller.setDefaultShippingAddress(version, id, lastAddressId);
      } else if (type === 'general') {
        await this.controller.setDefaultGeneralAddress(version, id, lastAddressId);
      }
      this.getCustomerData();
      return true;
    }
    return false;
  }

  addEventListenerToTheToggleButton() {
    const toggleButton = document.querySelector('.toggle-button');
    let isRotated = false;
    const addressEntries = document.querySelectorAll('.address-entry');

    toggleButton?.addEventListener('click', () => {
      isRotated = !isRotated;
      toggleButton.classList.toggle('rotate', isRotated);

      const addNewAddressButton = document.querySelector('.add-new-address-button');

      addressEntries.forEach((entry) => {
        entry.classList.toggle('hidden', !isRotated);
      });

      addNewAddressButton?.classList.toggle('hidden', !isRotated);
    });
  }

  addEventListenerToTheToggleButtonOfElement(element: Element) {
    const toggleButton = document.querySelector('.toggle-button');
    let isRotated = true;

    toggleButton?.addEventListener('click', () => {
      isRotated = !isRotated;
      toggleButton.classList.toggle('rotate', isRotated);
      if (element) {
        element.classList.toggle('hidden', !isRotated);
      }
    });
  }

  addEventListenerToTheEditForms() {
    const addressesEntries = document.querySelectorAll('.address-entry');

    addressesEntries.forEach((entry, index) => {
      this.addEventListenerToTheEditForm(entry, index);
    });
  }

  addEventListenerToTheEditForm(entry: Element, index: number) {
    const editButton = entry.querySelector('.edit-button');
    if (editButton) {
      editButton.addEventListener('click', () => {
        const address = this.addresses?.[index];
        if (address) {
          const newAddressFormContainer = this.newAddressForm.renderNewAddressForm(address) as HTMLElement;
          const newAddressForm = newAddressFormContainer.querySelector('.new-address-form') as HTMLFormElement;
          const addressSection = document.querySelector('.addresses-section');
          addressSection?.replaceChild(newAddressFormContainer, entry);
          this.buttons.addInactivityOfNewAddressButton();
          this.buttons.addInactivityOfEditButtons();

          this.newAddressForm.addEventListenersToTheIconsContainer();

          const id = this.controller.getID();

          this.controller.checkValidationAddress(newAddressForm);

          newAddressForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (newAddressForm.reportValidity()) {
              const newStreetName = (document.querySelector('.new-address-form .input-street') as HTMLInputElement)
                .value;
              const newCity = (document.querySelector('.new-address-form .input-city') as HTMLInputElement).value;
              const newPostalCode = (document.querySelector('.new-address-form .input-code') as HTMLInputElement).value;
              const newCountry = (document.querySelector('.new-address-form .input-country') as HTMLInputElement).value;
              let inputCountryCode = iso3166.whereCountry(newCountry)?.alpha2 || 'UNDEFINED';
              if (newCountry === 'United States') {
                inputCountryCode = 'US';
              }

              let addressType;
              let isDefault: boolean = false;
              const iconsAddressContainer = document.querySelector('.billing-shipping-icons-container') as HTMLElement;
              const addressId = this.addresses?.find((element) => address.id === element.id)?.id;

              if (this.version && id && addressId) {
                await this.controller.changeAddress(
                  this.version,
                  id,
                  addressId,
                  newStreetName,
                  newPostalCode,
                  newCity,
                  inputCountryCode
                );
                await this.getCustomerData();
                if (this.addresses) {
                  const allImages = iconsAddressContainer.querySelectorAll('img');
                  for (const img of allImages) {
                    if (img.classList.contains('address-clicked') && this.version && addressId) {
                      if (img.id === 'billing-address') {
                        await this.controller.setBillingAddress(this.version, id, addressId);
                        await this.getCustomerData();
                        addressType = 'billing';
                        isDefault = await this.checkDefaultAddress(this.version, id, addressId, 'billing');
                      } else if (img.id === 'shipping-address') {
                        await this.controller.setShippingAddress(this.version, id, addressId);
                        await this.getCustomerData();
                        isDefault = await this.checkDefaultAddress(this.version, id, addressId, 'shipping');
                        addressType = 'shipping';
                      } else if (img.id === 'general-address') {
                        await this.controller.setBillingAddress(this.version, id, addressId);
                        await this.getCustomerData();
                        await this.controller.setShippingAddress(this.version, id, addressId);
                        await this.getCustomerData();
                        isDefault = await this.checkDefaultAddress(this.version, id, addressId, 'general');
                        addressType = 'general';
                      }
                    }
                  }
                  this.renderSuccessfulMessage(newAddressForm);
                  const addressesSection = document.querySelector('.addresses-section') as HTMLElement;
                  if (addressType && this.addresses) {
                    if (addressesSection.contains(newAddressFormContainer)) {
                      const updatedAddress = this.addresses.find((element) => element.id === addressId) as Address;
                      const newAddressEmpty = this.addressSection.renderAddressSection(
                        this.addresses[this.addresses.indexOf(updatedAddress)],
                        addressType,
                        isDefault
                      );
                      this.addEventListenerToTheToggleButtonOfElement(newAddressEmpty);
                      newAddressEmpty.classList.remove('hidden');
                      addressesSection.replaceChild(newAddressEmpty, newAddressFormContainer);
                      const deleteButton = newAddressEmpty.querySelector('.delete-img');
                      deleteButton?.addEventListener('click', async () => {
                        await this.getCustomerData();
                        if (this.addresses && this.version && id) {
                          if (addressId) {
                            await this.controller.removeAddress(this.version, id, addressId);
                            await this.getCustomerData();
                            addressesSection.removeChild(newAddressEmpty);
                          }
                        }
                      });
                      this.buttons.removeInactivityOfNewAddressButton();
                      this.buttons.addActivityOfEditButtons();
                      this.getCustomerData();
                      this.addEventListenerToTheEditForm(newAddressEmpty, this.addresses.indexOf(updatedAddress));
                    } else {
                      console.log('newAddressFormContainer is not a child of addressesSection');
                    }
                  }
                }
              }
            }
          });
          const closeButton = newAddressFormContainer.querySelector('.close-icon-img');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              const { addressType, isDefault } = this.returnAddressType(address);
              this.rerenderAddressEntry(newAddressFormContainer, address, addressType, isDefault);
              this.buttons.removeInactivityOfNewAddressButton();
              this.buttons.addActivityOfEditButtons();
            });
          }
        }
      });
    }
  }

  rerenderAddressEntry(form: HTMLElement, address: Address, type: string, isDefault: boolean) {
    const addressesSection = document.querySelector('.addresses-section') as HTMLElement;
    const oldAddress = this.addressSection.renderAddressSection(address, type, isDefault);
    addressesSection.replaceChild(oldAddress, form);
    oldAddress.classList.remove('hidden');
    if (this.addresses) {
      this.addEventListenerToTheEditForm(oldAddress, this.addresses.indexOf(address));
    }
  }
}
