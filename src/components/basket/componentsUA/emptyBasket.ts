import HTMLCreator from 'src/components/HTMLCreator';

export default class EmptyBasket {
  renderEmptyBasket() {
    const container = HTMLCreator.createElement('div', { class: 'empty-basket-container' }, [
      HTMLCreator.createElement('div', { class: 'empty-basket' }, [
        HTMLCreator.createElement('img', { class: 'corgi-sad', src: '../../assets/sad-corgi.webp' }),
        HTMLCreator.createElement('h2', { class: 'empty-basket-message' }, ['Your basket is empty!']),
        HTMLCreator.createElement('p', { class: 'empty-basket-catalog-message' }, [
          'Please go to the ',
          HTMLCreator.createElement('button', { class: 'catalog-button' }, ['Catalog']),
          ' to fill it up.',
        ]),
        HTMLCreator.createElement('video', { class: 'corgi-meme', src: '../../assets/corgi-meme.mov' }, []),
      ]),
    ]);
    HTMLCreator.createElement('main', { class: 'main-container' }, [container]);
  }
}
