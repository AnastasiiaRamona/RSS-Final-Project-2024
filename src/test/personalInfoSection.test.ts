import PersonalInfoSection from '../components/userProfile/componentsUI/personalInfoSection';
import HTMLCreator from '../components/HTMLCreator';

// Mock the Buttons class
jest.mock('../components/userProfile/componentsUI/buttons', () =>
  jest.fn().mockImplementation(() => ({
    renderEditButton: jest.fn().mockReturnValue('<mock edit button>'),
  }))
);

describe('PersonalInfoSection', () => {
  let personalInfoSection: PersonalInfoSection;

  beforeEach(() => {
    personalInfoSection = new PersonalInfoSection();
  });

  test('renderPersonalInfoSection should create personal info section with correct content', () => {
    const email = 'test@example.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const dateOfBirth = '1990-01-01';

    const expectedSection = HTMLCreator.createElement('div', { class: 'personal-info-section' }, [
      HTMLCreator.createElement('h2', {}, ['Personal Information', '<mock edit button>']),
      HTMLCreator.createElement('p', {}, [`Email: ${email}`]),
      HTMLCreator.createElement('p', {}, [`First Name: ${firstName}`]),
      HTMLCreator.createElement('p', {}, [`Last Name: ${lastName}`]),
      HTMLCreator.createElement('p', {}, [`Date of Birth: ${dateOfBirth}`]),
    ]);

    const renderedSection = personalInfoSection.renderPersonalInfoSection(email, firstName, lastName, dateOfBirth);

    expect(renderedSection).toEqual(expectedSection);
  });
});
