import HTMLCreator from '../../HTMLCreator';
import videoSrc from '../../../assets/corgi-meme.webm';
import emptyCartSrc from '../../../assets/empty-cart.webp';
import catalogIconSrc from '../../../assets/catalog-icon.webp';

export default class EmptyBasket {
  renderEmptyBasket() {
    const video = HTMLCreator.createElement(
      'video',
      { class: 'corgi-meme', src: videoSrc, type: 'video/webm' },
      []
    ) as HTMLVideoElement;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const container = HTMLCreator.createElement('div', { class: 'empty-basket-container' }, [
      HTMLCreator.createElement('div', { class: 'empty-basket' }, [
        HTMLCreator.createElement('img', { class: 'empty-cart', src: emptyCartSrc, alt: 'empty cart' }),
        HTMLCreator.createElement('h2', { class: 'empty-basket-message' }, ['Your Shopping Cart is Empty']),
        HTMLCreator.createElement('p', { class: 'empty-basket-catalog-message' }, [
          `It looks like you haven't added any items to your cart yet. But don't worry, our store is filled with amazing products just waiting for you!`,
        ]),
        HTMLCreator.createElement('button-and-video', { class: 'catalog-button-and-video' }, [
          HTMLCreator.createElement('button', { class: 'catalog-button' }, [
            'Catalog Product',
            HTMLCreator.createElement('img', {
              class: 'left-dashboard__image',
              src: catalogIconSrc,
              alt: 'catalog icon',
            }),
          ]),
          video,
        ]),
      ]),
    ]);
    HTMLCreator.createElement('main', { class: 'main-container' }, [container]);

    return container;
  }

  addEventListeners() {
    const container = document.querySelector('.empty-basket-container');
    const video = document.querySelector('.corgi-meme') as HTMLVideoElement;
    if (container && video) {
      document.addEventListener(
        'click',
        () => {
          video.load();
          video.play();
        },
        { once: true }
      );
    }
    if (container) {
      const catalogButton = container.querySelector('.catalog-button') as HTMLButtonElement;

      catalogButton?.addEventListener('click', () => {
        const catalogEvent = new CustomEvent('catalogEvent');
        document.body.dispatchEvent(catalogEvent);
      });
    }
  }
}
