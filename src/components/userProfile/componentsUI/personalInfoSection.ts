import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';

export default class PersonalInfoSection {
  private buttons: Buttons;

  constructor() {
    this.buttons = new Buttons();
  }

  renderPersonalInfoSection(email: string, firstName: string, lastName: string, dateOfBirth: string) {
    const editPersonalButton = this.buttons.renderEditButton();
    const personalInfoSection = HTMLCreator.createElement('div', { class: 'personal-info-section' }, [
      HTMLCreator.createElement('h2', {}, ['Personal Information', editPersonalButton]),
      HTMLCreator.createElement('p', {}, [`Email: ${email}`]),
      HTMLCreator.createElement('p', {}, [`First Name: ${firstName}`]),
      HTMLCreator.createElement('p', {}, [`Last Name: ${lastName}`]),
      HTMLCreator.createElement('p', {}, [`Date of Birth: ${dateOfBirth}`]),
    ]);
    return personalInfoSection;
  }
}
