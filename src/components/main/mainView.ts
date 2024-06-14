import HTMLCreator from '../HTMLCreator';
import promoCode1Src from '../../assets/promo-code-1.webp';
import promoCode2Src from '../../assets/promo-code-2.webp';
import promoCode3Src from '../../assets/promo-code-3.webp';
import promoCode4Src from '../../assets/promo-code-4.webp';
import promoCode5Src from '../../assets/promo-code-5.webp';

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
        description: 'Enjoy free shipping on orders over $50 with Promo Code 2. Shop now and save!',
      },
      {
        src: promoCode3Src,
        title: 'Promo Code 3',
        description: 'Get 10% off on your purchase of animal clothing with Promo Code 3! Hurry, offer ends soon!',
      },
      {
        src: promoCode4Src,
        title: 'Promo Code 4',
        description: 'Save 90% on pet accessories with Promo Code 4. Perfect for spoiling your furry friends.',
      },
      {
        src: promoCode5Src,
        title: 'Promo Code 5',
        description: 'Exclusive 12% discount on premium pet food with Promo Code 5. Nourish your pets with the best.',
      },
    ];

    const promoCodeElements = promoData.map((promo) =>
      HTMLCreator.createElement('div', { class: 'promo-code' }, [
        HTMLCreator.createElement('img', { src: promo.src, alt: promo.title }, []),
        HTMLCreator.createElement('h3', { class: 'promo-code__title' }, [promo.title]),
        HTMLCreator.createElement('p', { class: 'promo-code__description' }, [promo.description]),
      ])
    );

    const mainField = HTMLCreator.createElement('main', { class: 'main-field' }, [
      HTMLCreator.createElement('section', { class: 'main-area' }, [
        HTMLCreator.createElement('h1', { class: 'main-area__header' }, [`Welcome to Paws & Claws`]),
        HTMLCreator.createElement('p', { class: 'main-area__text' }, [
          `Your ultimate destination for online pet shopping! Check out our exclusive promo codes below and save on your next purchase.`,
        ]),
        HTMLCreator.createElement('div', { class: 'main-area__promo-codes' }, [...promoCodeElements]),
      ]),
    ]);

    return mainField;
  }
}
