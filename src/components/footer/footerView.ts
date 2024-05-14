import HTMLCreation from '../HTMLCreation';
import './footer.scss';

export default class Footer {
  renderFooter() {
    const footer = HTMLCreation.createElement('footer', { class: 'footer-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'footer-dashboard__links' }, [
        HTMLCreation.createElement('p', { class: 'footer-dashboard__links__text' }, ['NLC TEAM 🦥']),
        HTMLCreation.createElement('a', { href: 'https://github.com/AnastasiiaRamona', target: '_blank' }, [
          'anastasiiaramona',
        ]),
        HTMLCreation.createElement('a', { href: 'https://github.com/aleks6699', target: '_blank' }, ['aleks6699']),
        HTMLCreation.createElement('a', { href: 'https://github.com/MartiP54', target: '_blank' }, ['MartiP54']),
      ]),
      HTMLCreation.createElement('p', { class: 'footer-dashboard__text' }, ['2024']),
    ]);

    return footer;
  }
}
