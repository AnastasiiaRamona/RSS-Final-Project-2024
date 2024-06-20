import HTMLCreator from '../../HTMLCreator';
import Buttons from './buttons';

export default class SecuritySettingsSection {
  private buttons: Buttons;

  constructor() {
    this.buttons = new Buttons();
  }

  renderSecuritySettingsSection() {
    const securitySettingSection = HTMLCreator.createElement('div', { class: 'security-settings-section' }, [
      HTMLCreator.createElement('h2', {}, ['Security Settings']),
      this.buttons.renderChangePasswordButton(),
    ]);
    return securitySettingSection;
  }
}
