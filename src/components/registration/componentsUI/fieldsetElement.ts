import HTMLCreator from '../../HTMLCreator';

export default class FieldsetRegistrationAddress {
  className: string;

  title: string;

  constructor(className: string, title: string) {
    this.className = className;
    this.title = title;
  }

  private renderDatalist() {
    const countries = ['United States', 'Germany', 'Italy'];
    const options = countries.map((country) => HTMLCreator.createElement('option', { value: country }));
    return HTMLCreator.createElement('datalist', { id: 'countryList' }, options);
  }

  renderFieldsetRegistrationAddress() {
    const fieldsetRegistrationAddress = HTMLCreator.createElement(
      'fieldset',
      { class: `fieldset fieldset${this.className}` },
      [
        HTMLCreator.createElement('legend', { class: 'legend-registration' }, [this.title]),
        HTMLCreator.createElement('label', { class: `label label-street${this.className}` }, ['Street:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          class: `input-street${this.className} input input-street `,
          placeholder: 'street',
          required: 'true',
          name: 'street',
        }),
        HTMLCreator.createElement('label', { class: `label label-city${this.className}` }, ['City:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          class: `input-city${this.className} input input-city`,
          placeholder: 'city',
          required: 'true',
          name: 'city',
        }),
        HTMLCreator.createElement('label', { class: `label label-code${this.className}` }, ['Postal code:']),
        HTMLCreator.createElement('input', {
          type: 'text',
          class: `input-code${this.className} input input-code`,
          placeholder: 'postal code',
          required: 'true',
          name: 'postal code',
        }),
        HTMLCreator.createElement('label', { class: `label label-country${this.className}` }, ['Country']),
        HTMLCreator.createElement('input', {
          type: 'text',
          class: `input-country${this.className} input input-country`,
          placeholder: 'select one country',
          required: 'true',
          list: 'countryList',
          name: 'country',
        }),
        this.renderDatalist(),
        HTMLCreator.createElement('label', { class: `label label-name${this.className}` }, [
          'Default delivery address',
        ]),
        HTMLCreator.createElement('input', {
          type: 'checkbox',
          class: `check-default${this.className} input`,
          name: 'address',
        }),
      ]
    );
    return fieldsetRegistrationAddress;
  }

  renderFieldsetRegistrationUsers() {
    const fieldsetRegistrationUsers = HTMLCreator.createElement('fieldset', { class: 'fieldset-users' }, [
      HTMLCreator.createElement('legend', { class: 'legend-registration' }, ['Registration Users form']),
      HTMLCreator.createElement('label', { class: 'label label-mail' }, ['Mail:']),
      HTMLCreator.createElement('input', {
        type: 'email',
        class: 'input-mail input',
        placeholder: 'example@email.com',
        required: 'true',
      }),
      HTMLCreator.createElement('label', { class: 'label label-password' }, ['Password:']),
      HTMLCreator.createElement('input', {
        type: 'password',
        class: 'input-password input',
        placeholder: 'password',
        required: 'true',
      }),
      HTMLCreator.createElement('label', { class: 'label label-username' }, ['Username:']),
      HTMLCreator.createElement('input', {
        type: 'text',
        class: 'input-username input',
        placeholder: 'username',
        required: 'true',
      }),
      HTMLCreator.createElement('label', { class: 'label label-surname' }, ['Surname']),
      HTMLCreator.createElement('input', {
        type: 'text',
        class: 'input-surname input',
        placeholder: 'surname',
        required: 'true',
      }),
      HTMLCreator.createElement('label', { class: 'label label-date' }, ['Date of birth:']),

      HTMLCreator.createElement('input', {
        type: 'text',
        class: 'input-date input',
        placeholder: 'DD.MM.YYYY',
        required: 'true',
      }),
    ]);
    return fieldsetRegistrationUsers;
  }
}
