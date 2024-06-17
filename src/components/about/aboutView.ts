import HTMLCreator from '../HTMLCreator';
import photoAlexJpg from '../../assets/Oleksandr.jpg';
import photoAlexWebp from '../../assets/Oleksandr.webp';
import photoMartiJpg from '../../assets/Marti.jpg';
import photoMartiWebp from '../../assets/Marti.webp';
import photoAnastasiiaJpg from '../../assets/anastasiia-photo.jpg';
import photoAnastasiiaWebp from '../../assets/anastasiia-photo.webp';
import svgGit from '../../assets/github-svgrepo-com.svg';
import svgLinked from '../../assets/linked.svg';
import svgFb from '../../assets/facebook.svg';
import svgInsta from '../../assets/insta.svg';
import svgTelegram from '../../assets/telegram.svg';

export default class AboutPage {
  renderAboutList(
    linkEmail: string,
    textEmail: string,
    linkLocation: string,
    textLocation: string,
    linkEducation: string,
    textEducation: string
  ) {
    const aboutList = HTMLCreator.createElement('ul', { class: 'about-list' }, [
      HTMLCreator.createElement('li', { class: 'about-item about-email' }, [
        HTMLCreator.createElement('a', { class: 'about-item__link', href: linkEmail, target: '_blank' }, [textEmail]),
      ]),
      HTMLCreator.createElement('li', { class: 'about-item about-location' }, [
        HTMLCreator.createElement('a', { class: 'about-item__link', href: linkLocation, target: '_blank' }, [
          textLocation,
        ]),
      ]),
      HTMLCreator.createElement('li', { class: 'about-item about-education' }, [
        HTMLCreator.createElement('a', { class: 'about-item__link', href: linkEducation, target: '_blank' }, [
          textEducation,
        ]),
      ]),
    ]);
    return aboutList;
  }

  renderContact(linkGit: string, linkLinked: string, linkFb: string, linkInsta: string, linkTelegram: string) {
    const contacts = HTMLCreator.createElement('div', { class: 'about-icons' }, [
      HTMLCreator.createElement('a', { class: 'about-link git', href: linkGit, target: '_blank' }, [
        HTMLCreator.createElement('img', { src: svgGit, alt: 'git' }),
      ]),
      HTMLCreator.createElement('a', { class: 'about-link linked', href: linkLinked, target: '_blank' }, [
        HTMLCreator.createElement('img', { src: svgLinked, alt: 'linked' }),
      ]),
      HTMLCreator.createElement('a', { class: 'about-link fb', href: linkFb, target: '_blank' }, [
        HTMLCreator.createElement('img', { src: svgFb, alt: 'developer' }),
      ]),
      HTMLCreator.createElement('a', { class: 'about-link insta', href: linkInsta, target: '_blank' }, [
        HTMLCreator.createElement('img', { src: svgInsta, alt: 'developer' }),
      ]),
      HTMLCreator.createElement('a', { class: 'about-link telegram', href: linkTelegram, target: '_blank' }, [
        HTMLCreator.createElement('img', { src: svgTelegram, alt: 'developer' }),
      ]),
    ]);
    return contacts;
  }

  renderTeamMembersAlexCard() {
    const content = HTMLCreator.createElement('div', { class: 'about-content' }, [
      HTMLCreator.createElement('picture', { class: 'about-image' }, [
        HTMLCreator.createElement('source', { class: 'about-photo', srcset: photoAlexWebp, type: 'image/webp' }, []),
        HTMLCreator.createElement('source', { class: 'about-photo', srcset: photoAlexJpg, type: 'image/jpeg' }, []),
        HTMLCreator.createElement('img', { class: 'about-photo', src: photoAlexJpg, alt: 'developer' }, []),
      ]),
      HTMLCreator.createElement('div', { class: 'about-name' }, ['Oleksandr Tsurkan']),
      HTMLCreator.createElement('div', { class: 'about-position' }, ['Frontend Developer']),
      this.renderAboutList(
        'mailto:aleks6699@gmail.com',
        'aleks6699@gmail.com',
        'https://maps.app.goo.gl/Vnmd1gsDFsWz113S8',
        'Ukraine, Kyiv',
        'https://www.knutd.edu.ua/',
        'Kyiv National University of Technologies and Design (KNUTD)'
      ),
      HTMLCreator.createElement('h4', { class: 'about-bio' }, ['BIO']),
      HTMLCreator.createElement('p', { class: 'about-description' }, [
        `Oleksandr Tsurkan was born on December 6, 1993. He enjoys engaging in sports and spends his free time at the gym. 
        He loves watching movies and TV series. Oleksandr also enjoys traveling and discovering new things.
         With extensive experience in development,
         he is committed to advancing and growing further in this field.

`,
      ]),
      HTMLCreator.createElement('h4', { class: 'about-contact' }, ['Contact']),
      this.renderContact(
        'https://github.com/aleks6699',
        'https://www.linkedin.com/in/aleks6699/',
        'https://www.facebook.com/',
        'https://www.instagram.com/alex._tsurkan/',
        'https://t.me/AleksTsurkan'
      ),
    ]);
    return content;
  }

  renderTeamMembersAnastasiiaCard() {
    const content = HTMLCreator.createElement('div', { class: 'about-content' }, [
      HTMLCreator.createElement('picture', { class: 'about-image' }, [
        HTMLCreator.createElement(
          'source',
          { class: 'about-photo', srcset: photoAnastasiiaWebp, type: 'image/webp' },
          []
        ),
        HTMLCreator.createElement(
          'source',
          { class: 'about-photo', srcset: photoAnastasiiaJpg, type: 'image/jpeg' },
          []
        ),
        HTMLCreator.createElement('img', { class: 'about-photo', src: photoAnastasiiaJpg, alt: 'developer' }, []),
      ]),
      HTMLCreator.createElement('div', { class: 'about-name' }, ['Anastasiia Kabanova']),
      HTMLCreator.createElement('div', { class: 'about-position' }, ['Frontend Developer']),
      this.renderAboutList(
        'mailto:anastasiarchm@gmail.com',
        'anastasiarchm@gmail.com',
        'https://maps.app.goo.gl/SfK7FF9ofzPKe3ZZ7',
        'Serbia, Belgrade',
        'https://www.uniyar.ac.ru/en/',
        'P.G. Demidov Yaroslavl State University'
      ),
      HTMLCreator.createElement('h4', { class: 'about-bio' }, ['BIO']),
      HTMLCreator.createElement('p', { class: 'about-description' }, [
        'Anastasiia Kabanova was born on September 12, 1996. She holds a degree in law but is currently pursuing a career in frontend development, aspiring to become a skilled professional in the field. Besides her passion for coding, Anastasiia is deeply involved in music. She releases her own music across all streaming platforms.',
      ]),
      HTMLCreator.createElement('h4', { class: 'about-contact' }, ['Contact']),
      this.renderContact(
        'https://github.com/AnastasiiaRamona',
        'https://www.linkedin.com/in/anastasiiarchm/',
        'https://www.facebook.com/people/Anastasiia-Ramona/pfbid0ViAmqHidkAT9stQDAToK8tZuXKDnJbMuTswCG7mdPcUKiWeWNWQVX2D2QULKedXKl/',
        'https://www.instagram.com/sia.de.ramona/',
        'https://t.me/AnastasiaKabanova'
      ),
    ]);
    return content;
  }

  renderTeamMembersMartiCard() {
    const content = HTMLCreator.createElement('div', { class: 'about-content' }, [
      HTMLCreator.createElement('picture', { class: 'about-image' }, [
        HTMLCreator.createElement('source', { class: 'about-photo', srcset: photoMartiWebp, type: 'image/webp' }),
        HTMLCreator.createElement('source', { class: 'about-photo', srcset: photoMartiJpg, type: 'image/jpeg' }),
        HTMLCreator.createElement('img', { class: 'about-photo', src: photoMartiJpg, alt: 'developer' }),
      ]),
      HTMLCreator.createElement('div', { class: 'about-name' }, ['Yuri Porokhin']),
      HTMLCreator.createElement('div', { class: 'about-position' }, ['Frontend Developer']),
      this.renderAboutList(
        'mailto:marti.iden.cod@gmail.com',
        'marti.iden.cod@gmail.com',
        'https://maps.app.goo.gl/CX35KjdbiRBSfpMD7',
        'Russia, Novosibirsk',
        'https://sibsutis.ru/',
        'Siberian State University of Telecommunications and Informatics'
      ),
      HTMLCreator.createElement('h4', { class: 'about-bio' }, ['BIO']),
      HTMLCreator.createElement('p', { class: 'about-description' }, [
        `Yuri has five years of experience working as a network engineer. He is currently pursuing a career in frontend development. Eventually would like to become a fullstack developer. Passionate about running and swimming, wants to improve cycling skills and do triathlons. He's into history, movies and travel.`,
      ]),
      HTMLCreator.createElement('h4', { class: 'about-contact' }, ['Contact']),
      this.renderContact(
        'https://github.com/MartiP54/',
        'https://www.linkedin.com/',
        'https://www.facebook.com/',
        'https://www.instagram.com/',
        'https://t.me/'
      ),
    ]);
    return content;
  }

  renderCollaborationSection() {
    const collaboration = HTMLCreator.createElement('section', { class: 'about-contributions' }, [
      HTMLCreator.createElement('h2', { class: 'about-contributions__title' }, ['Contributions']),
      HTMLCreator.createElement('p', { class: 'about-contributions__text' }, [
        `  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos in inventore perspiciatis, neque aspernatur unde facilis nulla quae,
          tenetur optio asperiores nemo, sunt molestiae provident illo mollitia corporis eligendi adipisci! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ratione ipsam dolorum nisi doloribus enim molestias! Exercitationem dolores obcaecati harum sed mollitia aperiam,
          dolor, nam provident velit, explicabo reprehenderit consectetur corporis.`,
      ]),
    ]);
    return collaboration;
  }

  renderFooter() {
    const footer = HTMLCreator.createElement('section', { class: 'about-footer' }, [
      HTMLCreator.createElement('div', { class: 'footer-wrapper' }, [
        HTMLCreator.createElement('div', { class: 'footer-inner' }, [
          HTMLCreator.createElement('h4', { class: 'footer-title' }, ['Development Team:']),
          HTMLCreator.createElement('ul', { class: 'footer-list' }, [
            HTMLCreator.createElement('li', { class: 'footer-item' }, [
              HTMLCreator.createElement(
                'a',
                { class: 'footer-link', href: 'https://github.com/aleks6699', target: '_blank' },
                ['Oleksandr Tsurkan']
              ),
            ]),
            HTMLCreator.createElement('li', { class: 'footer-item' }, [
              HTMLCreator.createElement(
                'a',
                { class: 'footer-link', href: 'https://github.com/AnastasiiaRamona', target: '_blank' },
                ['Anastasiia Kabanova']
              ),
            ]),
            HTMLCreator.createElement('li', { class: 'footer-item' }, [
              HTMLCreator.createElement(
                'a',
                { class: 'footer-link', href: 'https://github.com/MartiP54/', target: '_blank' },
                ['Yuri Porokhin']
              ),
            ]),
          ]),
        ]),
        HTMLCreator.createElement('div', { class: 'footer-copyright' }, ['2024 ©']),
        HTMLCreator.createElement('a', { class: 'footer-logo__link', href: 'https://rs.school/', target: '_blank' }),
      ]),
    ]);
    const logoLink = footer.querySelector('.footer-logo__link');
    if (logoLink) {
      logoLink.innerHTML = `
        <svg width="80" height="80" viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5701_38384)">
            <circle cx="32" cy="32" r="32" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 21.5095V42.5L19.3067 42.4621V33.9474C20.0567 33.9474 20.7616 33.9775 21.4049 34.4267C21.8946 34.8785 22.2838 35.4335 22.546 36.054L25.9202 42.4621H33C31.5957 39.6675 30.4706 36.1327 28.0552 34.0104C27.5455 33.6749 26.9919 33.4158 26.411 33.241C27.1873 33.0779 27.9357 32.7973 28.6319 32.4084C30.3855 31.3375 31.3915 29.3808 31.3436 27.3374C31.3798 26.1328 31.0495 24.9466 30.3988 23.9441C28.9256 21.6883 25.9337 21.4213 23.4663 21.5095H13ZM21.9939 30.0116H19.3313V25.6975H22.1043C23.4807 25.5594 25.1814 26.1754 25.0859 27.8041C25.1499 29.5621 23.3647 29.9127 21.9939 30.0116Z" fill="#FFB749"/>
            <path d="M39.4768 35.089L33 35.4666C33.1262 37.3671 34.0021 39.16 35.4636 40.5088C36.9117 41.8323 39.5076 42.4941 43.2515 42.4941C46.3564 42.5823 49.9058 41.8146 51.821 39.1569C52.5929 38.0934 53.0033 36.8427 52.9998 35.564C53.0217 33.1848 51.4339 31.2297 49.3044 30.3147C47.2632 29.4766 45.1198 28.8674 42.9204 28.5C42.1107 28.41 41.3327 28.1563 40.6423 27.757C39.9039 27.2597 40.078 26.2272 40.735 25.7596C42.6084 24.5207 45.6299 25.5545 45.8608 27.9032L52.2845 27.5621C52.1703 25.768 51.1844 24.0545 49.6356 22.9583C47.6987 21.8887 45.4532 21.3874 43.1986 21.5212C41.3493 21.4527 39.5037 21.7218 37.7682 22.3128C35.6082 23.1125 33.829 25.064 33.8344 27.4525C33.7931 28.9377 34.5158 30.4088 35.755 31.3621C37.6454 32.6238 39.8325 33.4582 42.139 33.798C43.3833 33.9637 44.5727 34.3795 45.6224 35.0159C46.5878 35.7309 46.5807 37.167 45.5959 37.8903C44.5078 38.6532 42.9034 38.7416 41.6818 38.2468C40.3717 37.716 39.6048 36.4784 39.4768 35.089Z" fill="#FFB749"/>
          </g>
          <defs>
            <clipPath id="clip0_5701_38384">
              <rect width="64" height="64" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      `;
    }
    return footer;
  }

  renderAboutPage() {
    const main = HTMLCreator.createElement('main', { class: 'about-main' }, [
      HTMLCreator.createElement('div', { class: 'about-container' }, [
        HTMLCreator.createElement('section', { class: 'about-team_work' }, [
          HTMLCreator.createElement('h1', { class: 'about-title' }, ['Development Team']),
          HTMLCreator.createElement('div', { class: 'about-wrapper' }, [
            this.renderTeamMembersAlexCard(),
            this.renderTeamMembersAnastasiiaCard(),
            this.renderTeamMembersMartiCard(),
          ]),
        ]),
        this.renderCollaborationSection(),
        this.renderFooter(),
      ]),
    ]);
    return main;
  }
}
