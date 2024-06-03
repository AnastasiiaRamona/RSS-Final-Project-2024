import HTMLCreation from '../../HTMLCreation';

export default class FieldsetRegistrationAddress {
  className: string;

  title: string;

  constructor(className: string, title: string) {
    this.className = className;
    this.title = title;
  }

  private renderDatalist() {
    const countries = ['United States', 'Germany', 'Italy'];
    const options = countries.map((country) => HTMLCreation.createElement('option', { value: country }));
    return HTMLCreation.createElement('datalist', { id: 'countryList' }, options);
  }

  renderFieldsetRegistrationAddress() {
    const fieldsetRegistrationAddress = HTMLCreation.createElement(
      'fieldset',
      { class: `fieldset fieldset${this.className}` },
      [
        HTMLCreation.createElement('legend', { class: 'legend-registration' }, [this.title]),
        HTMLCreation.createElement('label', { class: `label label-street${this.className}` }, ['Street:']),
        HTMLCreation.createElement('input', {
          type: 'text',
          class: `input-street${this.className} input input-street `,
          placeholder: 'street',
          required: 'true',
          name: 'street',
        }),
        HTMLCreation.createElement('label', { class: `label label-city${this.className}` }, ['City:']),
        HTMLCreation.createElement('input', {
          type: 'text',
          class: `input-city${this.className} input input-city`,
          placeholder: 'city',
          required: 'true',
          name: 'city',
        }),
        HTMLCreation.createElement('label', { class: `label label-code${this.className}` }, ['Postal code:']),
        HTMLCreation.createElement('input', {
          type: 'text',
          class: `input-code${this.className} input input-code`,
          placeholder: 'postal code',
          required: 'true',
          name: 'postal code',
        }),
        HTMLCreation.createElement('label', { class: `label label-country${this.className}` }, ['Country']),
        HTMLCreation.createElement('input', {
          type: 'text',
          class: `input-country${this.className} input input-country`,
          placeholder: 'select one country',
          required: 'true',
          list: 'countryList',
          name: 'country',
        }),
        this.renderDatalist(),
        HTMLCreation.createElement('label', { class: `label label-name${this.className}` }, [
          'Default delivery address',
        ]),
        HTMLCreation.createElement('input', {
          type: 'checkbox',
          class: `check-default${this.className} input`,
          name: 'address',
        }),
      ]
    );
    return fieldsetRegistrationAddress;
  }

  renderFieldsetRegistrationUsers() {
    const fieldsetRegistrationUsers = HTMLCreation.createElement('fieldset', { class: 'fieldset-users' }, [
      HTMLCreation.createElement('legend', { class: 'legend-registration' }, ['Registration Users form']),
      HTMLCreation.createElement('label', { class: 'label label-mail' }, ['Mail:']),
      HTMLCreation.createElement('input', {
        type: 'email',
        class: 'input-mail input',
        placeholder: 'example@email.com',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-password' }, ['Password:']),
      HTMLCreation.createElement('input', {
        type: 'password',
        class: 'input-password input',
        placeholder: 'password',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-username' }, ['Username:']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-username input',
        placeholder: 'username',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-surname' }, ['Surname']),
      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-surname input',
        placeholder: 'surname',
        required: 'true',
      }),
      HTMLCreation.createElement('label', { class: 'label label-date' }, ['Date of birth:']),

      HTMLCreation.createElement('input', {
        type: 'text',
        class: 'input-date input',
        placeholder: 'DD.MM.YYYY',
        required: 'true',
      }),
    ]);
    return fieldsetRegistrationUsers;
  }
}
