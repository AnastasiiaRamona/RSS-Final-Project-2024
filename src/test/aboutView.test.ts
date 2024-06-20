import HTMLCreator from '../components/HTMLCreator';
import AboutPage from '../components/about/aboutView';

jest.mock('../components//HTMLCreator', () => ({
  createElement: jest.fn(),
}));

jest.mock('../components/HTMLCreator', () => ({
  createElement: jest.fn(),
}));

describe('AboutPage', () => {
  let aboutPage: AboutPage;

  beforeEach(() => {
    aboutPage = new AboutPage();
    (HTMLCreator.createElement as jest.Mock).mockClear();
    (HTMLCreator.createElement as jest.Mock).mockImplementation(
      (
        tagName: string,
        attributes: { [key: string]: string },
        children: (HTMLElement | HTMLInputElement | string | null | undefined)[] = []
      ) => {
        const element = document.createElement(tagName);
        Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
        (children || []).forEach((child) => {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            element.appendChild(child);
          }
        });
        return element;
      }
    );
  });

  test('should create about list', () => {
    const aboutList = aboutPage.renderAboutList(
      'mailto:test@example.com',
      'test@example.com',
      'https://maps.example.com/location',
      'Example Location',
      'https://example.edu',
      'Example University'
    );

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(7);
    expect(HTMLCreator.createElement).toHaveBeenCalledWith('ul', { class: 'about-list' }, expect.any(Array));
    expect(aboutList).toBeDefined();
  });

  test('should create contact section', () => {
    const contacts = aboutPage.renderContact(
      'https://github.com/test',
      'https://www.linkedin.com/test',
      'https://www.facebook.com/test',
      'https://www.instagram.com/test',
      'https://t.me/test'
    );

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(11);
    expect(HTMLCreator.createElement).toHaveBeenCalledWith('div', { class: 'about-icons' }, expect.any(Array));
    expect(contacts).toBeDefined();
  });

  test('should create team member Alex card', () => {
    const alexCard = aboutPage.renderTeamMembersAlexCard();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(28);
    expect(alexCard).toBeDefined();
  });

  test('should create team member Anastasiia card', () => {
    const anastasiiaCard = aboutPage.renderTeamMembersAnastasiiaCard();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(28);
    expect(anastasiiaCard).toBeDefined();
  });

  test('should create team member Marti card', () => {
    const martiCard = aboutPage.renderTeamMembersMartiCard();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(28);
    expect(martiCard).toBeDefined();
  });

  test('should create collaboration section', () => {
    const collaboration = aboutPage.renderCollaborationSection();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(3);
    expect(HTMLCreator.createElement).toHaveBeenCalledWith(
      'section',
      { class: 'about-contributions' },
      expect.any(Array)
    );
    expect(collaboration).toBeDefined();
  });

  test('should create footer', () => {
    (HTMLCreator.createElement as jest.Mock).mockReturnValueOnce({
      querySelector: jest.fn().mockReturnValueOnce({
        innerHTML: '',
      }),
    });

    const footer = aboutPage.renderFooter();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(13);
    expect(HTMLCreator.createElement).toHaveBeenCalledWith('section', { class: 'about-footer' }, expect.any(Array));
    expect(footer).toBeDefined();
  });

  test('should create about page', () => {
    const main = aboutPage.renderAboutPage();

    expect(HTMLCreator.createElement).toHaveBeenCalledTimes(105);
    expect(main).toBeDefined();
  });
});
