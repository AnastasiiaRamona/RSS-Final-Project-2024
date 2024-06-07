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
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni recusandae consectetur eum voluptate culpa
      nemo. Dolor eius totam repellat voluptatem at, dolore inventore est praesentium nam quae hic,
      exercitationem quos.`,
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
        'https://www.uniyar.ac.en/',
        'P.G. Demidov Yaroslavl State University'
      ),
      HTMLCreator.createElement('h4', { class: 'about-bio' }, ['BIO']),
      HTMLCreator.createElement('p', { class: 'about-description' }, [
        'Anastasiia Kabanova was born on September 12, 1996. She holds a degree in law but is currently pursuing a career in frontend development, aspiring to become a skilled professional in the field. Besides her passion for coding, Anastasiia is deeply involved in music. She produces and releases her own music across all major streaming platforms.',
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
      HTMLCreator.createElement('div', { class: 'about-name' }, ['Marti']),
      HTMLCreator.createElement('div', { class: 'about-position' }, ['Frontend Developer']),
      this.renderAboutList(
        'mailto:aleks6699@gmail.com',
        'aleks6699@gmail.com',
        'https://maps.app.goo.gl/Vnmd1gsDFsWz113S8',
        'Russia, Novosibirsk',
        'https://www.knutd.edu.ua/',
        'Kyiv National University of Technologies and Design (KNUTD)'
      ),
      HTMLCreator.createElement('h4', { class: 'about-bio' }, ['BIO']),
      HTMLCreator.createElement('p', { class: 'about-description' }, [
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni recusandae consectetur eum voluptate culpa
      nemo. Dolor eius totam repellat voluptatem at, dolore inventore est praesentium nam quae hic,
      exercitationem quos.`,
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
      ]),
    ]);
    return main;
  }
}
