import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';
import deleteButtonSrc from '../../assets/delete-icon.webp';

export default class Basket {
  controller: BasketController;

  cartId: string | null = null;

  constructor() {
    this.controller = new BasketController();
  }

  async renderPage() {
    const heading = this.renderHeading();
    const cardsSection = await this.getCardsSection();
    const summarySection = this.renderSummarySection();
    const basketContainer = HTMLCreator.createElement('section', { class: 'basket-main' }, [
      heading,
      cardsSection,
      summarySection,
    ]);

    const main = HTMLCreator.createElement('main', { class: 'main-field' }, [basketContainer]);

    return main;
  }

  async getCardsSection() {
    const cardsSection = HTMLCreator.createElement('section', { class: 'basket__cards' });
    this.cartId = localStorage.getItem('cartPetShopId');
    if (this.cartId) {
      const cartData = await this.controller.getCart(this.cartId);
      cartData?.map((item) => {
        const id = item.productId;
        const name = item.name['en-US'];
        const imageUrl = item.variant.images?.[0]?.url as string;
        const price = item.price?.value.centAmount;
        const discountedPrice = item.price?.discounted?.value.centAmount;
        const card = this.renderProductCard(id, name, imageUrl, price, discountedPrice);
        return cardsSection.append(card);
      });
    }
    return cardsSection;
  }

  renderHeading() {
    const heading = HTMLCreator.createElement('h2', {}, ['Your Cart']);
    return heading;
  }

  renderProductCard(id: string, name: string, imgSrc: string, price: number, discountedPrice?: number) {
    const priceElement = HTMLCreator.createElement('p', { class: 'basket-product-price' }, [
      discountedPrice ? `${discountedPrice / 100} €` : `${price / 100} €`,
    ]);
    if (discountedPrice) {
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'basket-original-price' }, [`${price / 100} €`])
      );
    }

    const card = HTMLCreator.createElement('div', { class: 'basket-product-card', 'data-id': id }, [
      HTMLCreator.createElement('img', { src: imgSrc, alt: name }),
      HTMLCreator.createElement('h2', { class: 'basket-product-name' }, [name]),
      priceElement,

      HTMLCreator.createElement('img', {
        class: 'basket-remove-button',
        src: deleteButtonSrc,
        alt: 'delete button',
      }),
    ]);

    return card;
  }

  renderSummarySection() {
    const totalPrice = this.calculateTotalPrice();
    return HTMLCreator.createElement('section', { class: 'basket__summary' }, [
      HTMLCreator.createElement('h2', {}, ['Order Summary']),
      HTMLCreator.createElement('p', { class: 'total-price' }, [`Total: ${totalPrice / 100} €`]),
      HTMLCreator.createElement('button', { class: 'checkout-button' }, ['Proceed to Checkout']),
    ]);
  }

  calculateTotalPrice() {
    // Здесь должна быть логика для расчета общей суммы корзины
    return 0;
  }
}
