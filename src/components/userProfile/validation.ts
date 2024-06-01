export default class Validation {
  static checkValidationPersonalInformation(form: HTMLFormElement) {
    form.addEventListener('input', (event: Event) => {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      const { value } = element;

      if (value === '') {
        element.setCustomValidity('This field cannot be empty');
      } else {
        element.setCustomValidity('');
      }

      if (element.classList.contains('input-mail')) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          element.setCustomValidity('Email was entered incorrectly');
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-username') || element.classList.contains('input-surname')) {
        if (!/^[A-Za-z]+$/.test(value)) {
          element.setCustomValidity(
            'The name or surname must contain at least one character and not contain special characters or numbers.'
          );
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

  static checkValidationPassword(form: HTMLFormElement) {
    form.addEventListener('input', (event: Event) => {
      const element: HTMLInputElement = event.target as HTMLInputElement;
      const { value } = element;

      if (element.classList.contains('input-password')) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
          element.setCustomValidity(
            'Enter a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number. Only English letters and digits are allowed.'
          );
        } else {
          element.setCustomValidity('');
        }
      }
    });
  }
}
