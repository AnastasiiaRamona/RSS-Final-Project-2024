import HTMLCreator from '../HTMLCreator';
import promoCode1Src from '../../assets/promo-code-1.webp';
import promoCode2Src from '../../assets/promo-code-2.webp';
import promoCode3Src from '../../assets/promo-code-3.webp';
import promoCode4Src from '../../assets/promo-code-4.webp';

export default class Main {
  renderPage() {
    const promoData = [
      {
        src: promoCode1Src,
        title: 'Promo Code 1',
        description: 'Get 15% off on your purchase with Promo Code 1! Don’t miss out on this limited-time offer.',
      },
      {
        src: promoCode2Src,
        title: 'Promo Code 2',
        description: `Hot June Sale: 5% Off with Promo Code 2! Don't miss out on this scorching deal available only from June 15, 2024, to July 30, 2024.`,
      },
      {
        src: promoCode3Src,
        title: 'Promo Code 3',
        description: 'Get 20% off on your purchase with Promo Code 3! Hurry, offer ends soon!',
      },
      {
        src: promoCode4Src,
        title: 'Promo Code 4',
        description: 'Save 5% on the Bee Costume with Promo Code 4. Perfect for spoiling your furry friends.',
      },
    ];

    const promoCodeElements = promoData.map((promo) =>
      HTMLCreator.createElement('div', { class: 'promo-code' }, [
        HTMLCreator.createElement('img', { src: promo.src, alt: promo.title }, []),
        HTMLCreator.createElement('h3', { class: 'promo-code__title' }, [promo.title]),
        HTMLCreator.createElement('p', { class: 'promo-code__description' }, [promo.description]),
      ])
    );

    const actualNewsSection = HTMLCreator.createElement('section', { class: 'actual-news-section' }, [
      HTMLCreator.createElement('div', { class: 'actual-news-section__content' }, [
        HTMLCreator.createElement('div', { class: 'pet-wellness' }, [
          HTMLCreator.createElement('h2', { class: 'actual-news-section__text' }, ['Join Our Pet Wellness Workshop!']),
          HTMLCreator.createElement('p', { class: 'actual-news-section__text' }, [
            `Don't miss our upcoming Pet Wellness Workshop on Saturday from 2 PM to 4 PM. Learn from experts about the best practices for keeping your pets healthy and happy. Topics will include nutrition, exercise, grooming, and more. Plus, all attendees will receive a special discount on select wellness products.`,
          ]),
        ]),
        HTMLCreator.createElement('div', { class: 'pet-adoption' }, [
          HTMLCreator.createElement('h2', { class: 'actual-news-section__text' }, ['Grooming Services Update']),
          HTMLCreator.createElement('p', { class: 'actual-news-section__text' }, [
            `We are happy to announce that our grooming services have expanded! We now offer additional time slots and new grooming packages tailored to your pet’s needs. Book your appointment today to give your pet a fresh, clean look.
Stay tuned for more updates and follow us on social media for tips, special offers, and adorable pet photos. Visit us at Paws & Claws for all your pet care needs!`,
          ]),
        ]),
      ]),
    ]);

    const footerSection = HTMLCreator.createElement('section', { class: 'footer-section' }, [
      HTMLCreator.createElement('div', { class: 'footer-section__content' }, [
        HTMLCreator.createElement('p', { class: 'footer-section__text' }, ['Terms of Service | Privacy Policy']),
        HTMLCreator.createElement(
          'a',
          {
            class: 'footer-section__address',
            target: '_blank',
            href: 'https://www.google.com/maps/place/Baker+St,+London,+%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F/@51.5205653,-0.159371,17z/data=!3m1!4b1!4m6!3m5!1s0x48761ace9a2e67d7:0xd458de8d0fdc498e!8m2!3d51.5205653!4d-0.1567961!16zL20vMDJfMnlf?entry=ttu',
          },
          ['Address: Baker Street, London, UK']
        ),
        HTMLCreator.createElement('p', { class: 'footer-section__text' }, [
          '© 2024 Paws & Claws. All rights reserved.',
        ]),
      ]),
    ]);

    const mainField = HTMLCreator.createElement('main', { class: 'main-field' }, [
      HTMLCreator.createElement('section', { class: 'main-area' }, [
        HTMLCreator.createElement('div', { class: 'main-area__info' }, [
          HTMLCreator.createElement('h2', { class: 'main-area__header' }, [`Welcome to Paws & Claws!`]),
        ]),
        actualNewsSection,
        HTMLCreator.createElement('div', { class: 'main-area__promo-codes' }, [...promoCodeElements]),
        footerSection,
      ]),
    ]);

    return mainField;
  }

  addEventListeners() {
    const mainArea = document.querySelector('.main-area') as HTMLElement;
    if (mainArea) {
      mainArea.addEventListener('scroll', () => {
        const petWellnessSection = mainArea.querySelector('.pet-wellness') as HTMLElement;
        const petAdoptionSection = mainArea.querySelector('.pet-adoption') as HTMLElement;
        const scrollPosition = mainArea.scrollTop;
        const parallax = Math.min(scrollPosition * 0.1, mainArea.clientHeight);
        petWellnessSection.style.backgroundPosition = `center ${-parallax}px`;
        petAdoptionSection.style.backgroundPosition = `center ${-parallax}px`;
      });
    }
  }
}
