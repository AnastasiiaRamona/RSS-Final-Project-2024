import Toastify from 'toastify-js';

import RegistrationModel from './registrationModel';

export default class RegistrationController {
  model: RegistrationModel;

  constructor() {
    this.model = new RegistrationModel();
  }

  getErrorMessage(text: string) {
    Toastify({
      text,
      newWindow: true,
      className: 'info',
      close: true,
      selector: document.querySelector('.form-registration'),
      stopOnFocus: true, // Prevents dismissing of toast on hover
      offset: {
        x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 350, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },

      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },

      duration: 300000,
    }).showToast();
  }

  checkValidate(): void {
    const form = document.querySelector('.form-registration') as HTMLFormElement;
    const inputs = document.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.setCustomValidity('required field');
    });

    form.addEventListener('input', (event: Event) => {
      this.getErrorMessage('huydddddddddddddddddddddddddddddddddddddddddddddddddd');
      const element: HTMLInputElement = event.target as HTMLInputElement;
      const { value } = element;
      if (element.classList.contains('input-mail')) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          element.setCustomValidity('Email was entered incorrectly');
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-password')) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
          element.setCustomValidity(
            'Enter a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
          );
        } else {
          element.setCustomValidity('');
        }
      }
      if (element.classList.contains('input-street')) {
        if (!/^.+$/.test(value)) {
          element.setCustomValidity('Street must contain at least one character');
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-username') || element.classList.contains('input-surname')) {
        if (!/^[^\d\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/.test(value)) {
          element.setCustomValidity(
            'The name or surname must contain at least one character and not contain special characters or numbers.'
          );
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-city')) {
        if (!/^[^\W\d_]+$/.test(value)) {
          element.setCustomValidity(
            'City must contain at least one character and not contain special characters or numbers'
          );
        } else {
          element.setCustomValidity('');
        }
      }
      if (element.classList.contains('input-code')) {
        if (!/^\d{5}$/.test(value)) {
          element.setCustomValidity('Enter the correct code');
        } else {
          element.setCustomValidity('');
        }
      }
      if (element.classList.contains('input-country')) {
        if (!/(Italy|Germany|United States)/.test(value)) {
          element.setCustomValidity('Select one country from the list');
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-date')) {
        const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.\d{4}$/;
        if (!dateRegex.test(value)) {
          element.setCustomValidity('Enter the date in the format DD.MM.YYYY');
        } else {
          const [day, month, year] = value.split('.').map(Number);

          const currentDate = new Date();
          const userDate = new Date(year, month - 1, day);
          const minAgeDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
          if (minAgeDate < userDate) {
            element.setCustomValidity('You must be at least 13 years old.');
          } else {
            element.setCustomValidity('');
          }
        }
      }
    });
  }

  async getRegistration(email: string, password: string) {
    const result = await this.model.register(email, password);
    return result;
  }
}
