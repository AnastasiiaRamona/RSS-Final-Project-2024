import HTMLCreator from '../HTMLCreator';
import rsSchoolLogo from '../../assets/logoRSSchool.png';

export default class Footer {
  renderFooter() {
    const footer = HTMLCreator.createElement('footer', { class: 'footer-dashboard' }, [
      HTMLCreator.createElement('div', { class: 'footer-dashboard__links' }, [
        HTMLCreator.createElement('p', { class: 'footer-dashboard__links__text' }, ['NLC TEAM']),
        HTMLCreator.createElement('a', { href: 'https://github.com/AnastasiiaRamona', target: '_blank' }, [
          'anastasiiaramona',
        ]),
        HTMLCreator.createElement('a', { href: 'https://github.com/aleks6699', target: '_blank' }, ['aleks6699']),
        HTMLCreator.createElement('a', { href: 'https://github.com/MartiP54', target: '_blank' }, ['MartiP54']),
      ]),
      HTMLCreator.createElement('a', { href: 'https://rs.school/', class: 'footer__link-rsschool', target: '_blank' }, [
        HTMLCreator.createElement('img', { src: rsSchoolLogo, alt: 'RSSchool Logo', class: 'footer__icon' }),
        'Rolling Scopes School, 2024',
      ]),
    ]);

    return footer;
  }
}
