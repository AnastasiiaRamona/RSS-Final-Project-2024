class FormValidate {
  private form: HTMLFormElement;

  constructor() {
    this.form = document.querySelector('.form-registration') as HTMLFormElement;
  }

  checkValidate(): void {
    this.form.addEventListener('input', (event: Event) => {
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
        if (
          !(
            /^\d{5}$/.test(value) ||
            /^([A-Za-z]{1,2}\d{1,2}|[A-Za-z]\d[A-Za-z]\d[A-Za-z])$/.test(value) ||
            /^\d{5}$/.test(value)
          )
        ) {
          element.setCustomValidity('Enter the correct code');
        } else {
          element.setCustomValidity('');
        }
      }
      if (element.classList.contains('input-country')) {
        if (!/(United Kingdom|Germany|United States)/.test(value)) {
          element.setCustomValidity('Select one country from the list');
        } else {
          element.setCustomValidity('');
        }
      }

      if (element.classList.contains('input-date')) {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
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
}

export default FormValidate;
