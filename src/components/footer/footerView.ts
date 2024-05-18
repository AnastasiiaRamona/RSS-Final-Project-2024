import HTMLCreation from '../HTMLCreation';
import rsSchoolLogo from '../../assets/logoRSSchool.png';

export default class Footer {
  renderFooter() {
    const footer = HTMLCreation.createElement('footer', { class: 'footer-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'footer-dashboard__links' }, [
        HTMLCreation.createElement('p', { class: 'footer-dashboard__links__text' }, ['NLC TEAM']),
        HTMLCreation.createElement('a', { href: 'https://github.com/AnastasiiaRamona', target: '_blank' }, [
          'anastasiiaramona',
        ]),
        HTMLCreation.createElement('a', { href: 'https://github.com/aleks6699', target: '_blank' }, ['aleks6699']),
        HTMLCreation.createElement('a', { href: 'https://github.com/MartiP54', target: '_blank' }, ['MartiP54']),
      ]),
      HTMLCreation.createElement(
        'a',
        { href: 'https://rs.school/', class: 'footer__link-rsschool', target: '_blank' },
        [
          HTMLCreation.createElement('img', { src: rsSchoolLogo, alt: 'RSSchool Logo', class: 'footer__icon' }),
          'Rolling Scopes School, 2024',
        ]
      ),
    ]);

    return footer;
  }
}
