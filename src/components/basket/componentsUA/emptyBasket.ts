import HTMLCreator from '../../HTMLCreator';
import sadCorgiSrc from '../../../assets/sad-corgi.webp';
import videoSrc from '../../../assets/corgi-meme.webm';

export default class EmptyBasket {
  renderEmptyBasket() {
    const video = HTMLCreator.createElement('video', { class: 'corgi-meme', src: videoSrc }, []) as HTMLVideoElement;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    const container = HTMLCreator.createElement('div', { class: 'empty-basket-container' }, [
      HTMLCreator.createElement('div', { class: 'empty-basket' }, [
        HTMLCreator.createElement('img', { class: 'corgi-sad', src: sadCorgiSrc, alt: 'sad corgi' }),
        HTMLCreator.createElement('h2', { class: 'empty-basket-message' }, ['Your Shopping Cart is Empty']),
        HTMLCreator.createElement('p', { class: 'empty-basket-catalog-message' }, [
          `It looks like you haven't added any items to your cart yet. But don't worry, our store is filled with amazing products just waiting for you!`,
        ]),
        HTMLCreator.createElement('p', { class: 'empty-basket-catalog-message' }, [
          `Why not take a look at our latest collections and find something you love? Whether you're shopping for yourself or looking for a gift, we have something for everyone. Start exploring now and fill your cart with all the goodies you deserve!`,
        ]),
        HTMLCreator.createElement('button', { class: 'catalog-button' }, ['Catalog']),
        video,
      ]),
    ]);
    HTMLCreator.createElement('main', { class: 'main-container' }, [container]);
    return container;
  }
}
