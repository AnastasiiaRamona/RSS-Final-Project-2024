import SecuritySettingsSection from '../components/userProfile/componentsUI/securitySettingsSection';

describe('SecuritySettingsSection', () => {
  let securitySettingsSection: SecuritySettingsSection;

  beforeEach(() => {
    securitySettingsSection = new SecuritySettingsSection();
  });

  test('renderSecuritySettingsSection should return correct HTML element', () => {
    const section: HTMLElement = securitySettingsSection.renderSecuritySettingsSection();

    expect(section.tagName).toBe('DIV');
    expect(section.classList.contains('security-settings-section')).toBe(true);

    const header: HTMLHeadingElement | null = section.querySelector('h2');
    expect(header).toBeTruthy();
    expect(header!.textContent).toBe('Security Settings');

    const buttons: HTMLButtonElement | null = section.querySelector('.change-password-button');
    expect(buttons).toBeTruthy();
  });
});
