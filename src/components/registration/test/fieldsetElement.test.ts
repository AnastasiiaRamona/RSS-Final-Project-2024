import FieldsetRegistrationAddress from '../componentsUI/fieldsetElement';

describe('FieldsetRegistrationAddress', () => {
  let fieldset: FieldsetRegistrationAddress;

  beforeEach(() => {
    fieldset = new FieldsetRegistrationAddress('test-class', 'Test Fieldset');
  });

  it('should render street input field', () => {
    const renderedFieldset = fieldset.renderFieldsetRegistrationAddress();
    const streetInput = renderedFieldset.querySelector('.input-street') as HTMLInputElement;

    expect(streetInput).toBeTruthy();
    expect(streetInput.placeholder).toBe('street');
    expect(streetInput.required).toBe(true);
    expect(streetInput.name).toBe('street');
  });

  it('should render city input field', () => {
    const renderedFieldset = fieldset.renderFieldsetRegistrationAddress();
    const cityInput = renderedFieldset.querySelector('.input-city') as HTMLInputElement;

    expect(cityInput).toBeTruthy();
    expect(cityInput.placeholder).toBe('city');
    expect(cityInput.required).toBe(true);
    expect(cityInput.name).toBe('city');
  });

  it('should render postal code input field', () => {
    const renderedFieldset = fieldset.renderFieldsetRegistrationAddress();
    const postalCodeInput = renderedFieldset.querySelector('.input-code') as HTMLInputElement;

    expect(postalCodeInput).toBeTruthy();
    expect(postalCodeInput.placeholder).toBe('postal code');
    expect(postalCodeInput.required).toBe(true);
    expect(postalCodeInput.name).toBe('postal code');
  });

  it('should render country input field', () => {
    const renderedFieldset = fieldset.renderFieldsetRegistrationAddress();
    const countryInput = renderedFieldset.querySelector('.input-country') as HTMLInputElement;

    expect(countryInput).toBeTruthy();
    expect(countryInput.placeholder).toBe('select one country');
    expect(countryInput.required).toBe(true);
    expect(countryInput.name).toBe('country');
    expect(countryInput.getAttribute('list')).toBe('countryList');
  });

  it('should render date input field', () => {
    const renderedFieldset = fieldset.renderFieldsetRegistrationUsers();
    const dateInput = renderedFieldset.querySelector('.input-date') as HTMLInputElement;

    expect(dateInput).toBeTruthy();
    expect(dateInput.placeholder).toBe('DD.MM.YYYY');
    expect(dateInput.required).toBe(true);
  });
});
