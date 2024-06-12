import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';
import deleteButtonSrc from '../../assets/delete-icon.webp';
import promocodeIconSrc from '../../assets/promocode-icon.webp';
import clearIconSrc from '../../assets/clear-icon.webp';

export default class Basket {
  controller: BasketController;

  cartId: string | null = null;

  constructor() {
    this.controller = new BasketController();
  }

  async renderPage() {
    const cardsSection = await this.getCardsSection();
    const summarySection = this.renderSummarySection();
    const basketContainer = HTMLCreator.createElement('section', { class: 'basket-main' }, [
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
        const quantity = item?.quantity;
        const card = this.renderProductCard(id, name, imageUrl, price, quantity, discountedPrice);
        return cardsSection.append(card);
      });
    }
    return cardsSection;
  }

  renderProductCard(
    id: string,
    name: string,
    imgSrc: string,
    price: number,
    quantity: number,
    discountedPrice?: number
  ) {
    const priceElement = HTMLCreator.createElement('p', { class: 'basket-product-price' }, [
      discountedPrice ? `${discountedPrice / 100} €` : `${price / 100} €`,
    ]);
    if (discountedPrice) {
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'basket-original-price' }, [`${price / 100} €`])
      );
    }

    const quantityContainer = HTMLCreator.createElement('div', { class: 'quantity-container' });
    const decreaseButton = HTMLCreator.createElement('button', { class: 'decrease-button' }, ['-']);
    const quantityDisplay = HTMLCreator.createElement(
      'span',
      {
        class: 'quantity-display',
      },
      [quantity.toString()]
    );
    const increaseButton = HTMLCreator.createElement('button', { class: 'increase-button' }, ['+']);

    quantityContainer.append(decreaseButton, quantityDisplay, increaseButton);

    const card = HTMLCreator.createElement('div', { class: 'basket-product-card', 'data-id': id }, [
      HTMLCreator.createElement('img', { src: imgSrc, alt: name }),
      HTMLCreator.createElement('h2', { class: 'basket-product-name' }, [name]),
      priceElement,
      quantityContainer,
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
      HTMLCreator.createElement('div', { class: 'summary-buttons' }, [
        HTMLCreator.createElement('button', { class: 'checkout-button' }, [
          'Promo Code',
          HTMLCreator.createElement('img', {
            src: promocodeIconSrc,
            alt: 'promocode button',
          }),
        ]),
        HTMLCreator.createElement('button', { class: 'clear-button' }, [
          'Clear',
          HTMLCreator.createElement('img', {
            src: clearIconSrc,
            alt: 'clear button',
          }),
        ]),
      ]),
    ]);
  }

  calculateTotalPrice() {
    // Здесь должна быть логика для расчета общей суммы корзины
    return 0;
  }

  addEventListeners() {
    const quantityContainerArr = document.querySelectorAll('.quantity-container');

    quantityContainerArr.forEach((container) => {
      const decreaseButton = container.querySelector('.decrease-button') as HTMLButtonElement;
      const increaseButton = container.querySelector('.increase-button') as HTMLButtonElement;
      const quantityDisplay = container.querySelector('.quantity-display') as HTMLSpanElement;

      decreaseButton.addEventListener('click', () => {
        let currentQuantity = Number(quantityDisplay.textContent);
        if (currentQuantity > 1) {
          currentQuantity -= 1;
          quantityDisplay.textContent = `${currentQuantity}`;
        }
      });

      increaseButton.addEventListener('click', () => {
        let currentQuantity = Number(quantityDisplay.textContent);
        currentQuantity += 1;
        quantityDisplay.textContent = `${currentQuantity}`;
      });
    });
  }
}
