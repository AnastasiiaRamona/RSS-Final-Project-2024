import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';
import deleteButtonSrc from '../../assets/delete-icon.webp';
import promocodeIconSrc from '../../assets/promocode-icon.webp';
import clearIconSrc from '../../assets/clear-icon.webp';
import EmptyBasket from './componentsUA/emptyBasket';
import ModalWindow from './componentsUA/modalWindow';

export default class Basket {
  controller: BasketController;

  totalPrice: number = 0;

  oldTotalPrice: number = 0;

  emptyBasket: EmptyBasket;

  modalWindow: ModalWindow;

  constructor() {
    this.controller = new BasketController();
    this.emptyBasket = new EmptyBasket();
    this.modalWindow = new ModalWindow();
  }

  async renderPage() {
    const cardsSection = await this.getCardsSection();
    let basketContainer;
    if (cardsSection.children.length > 0) {
      const summarySection = this.renderSummarySection();
      basketContainer = HTMLCreator.createElement('section', { class: 'basket-main' }, [cardsSection, summarySection]);
    } else {
      const emptyBasket = this.emptyBasket.renderEmptyBasket();
      basketContainer = HTMLCreator.createElement('section', { class: 'basket-main' }, [emptyBasket]);
    }

    const basketWrapper = HTMLCreator.createElement('section', { class: 'basket-wrapper' }, [basketContainer]);
    const main = HTMLCreator.createElement('main', { class: 'main-field' }, [basketWrapper]);

    return main;
  }

  async getCardsSection() {
    const cardsSection = HTMLCreator.createElement('section', { class: 'basket__cards' });
    const cartData = await this.controller.getCart();
    this.totalPrice = cartData?.totalPrice?.centAmount ?? 0;
    const discountOnTheTotalPrice = cartData?.discountOnTotalPrice?.discountedAmount?.centAmount;
    let percentage: number | undefined;
    if (discountOnTheTotalPrice) {
      this.oldTotalPrice = this.totalPrice + discountOnTheTotalPrice;
      percentage = this.controller.findOutTheDiscountPercentage(this.oldTotalPrice, this.totalPrice) as number;
    }
    cartData?.lineItems.map((item) => {
      const id = item.productId;
      const name = item.name['en-US'];
      const imageUrl = item.variant.images?.[0]?.url as string;
      const price = item.price?.value.centAmount;
      let discountedPrice = item.price?.discounted?.value.centAmount;
      if (discountedPrice) {
        if (percentage) {
          discountedPrice = (discountedPrice * percentage) / 100;
        }
      } else if (percentage) {
        discountedPrice = (price * percentage) / 100;
      }
      const quantity = item?.quantity;
      const card = this.renderProductCard(id, name, imageUrl, price, quantity, discountedPrice);
      return cardsSection.append(card);
    });
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
    const priceElement = HTMLCreator.createElement('p', { class: 'total-price' }, [
      `Total: ${this.totalPrice / 100} €`,
    ]);

    if (this.oldTotalPrice > 0) {
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'old-total-price' }, [`${this.oldTotalPrice / 100} €`])
      );
    }

    return HTMLCreator.createElement('section', { class: 'basket__summary' }, [
      HTMLCreator.createElement('h2', {}, ['Order Summary']),
      priceElement,
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

  addEventListeners() {
    const quantityContainerArr = document.querySelectorAll('.quantity-container');

    quantityContainerArr.forEach((container) => {
      const decreaseButton = container.querySelector('.decrease-button') as HTMLButtonElement;
      const increaseButton = container.querySelector('.increase-button') as HTMLButtonElement;
      const quantityDisplay = container.querySelector('.quantity-display') as HTMLSpanElement;

      decreaseButton.addEventListener('click', async () => {
        let currentQuantity = Number(quantityDisplay.textContent);
        if (currentQuantity > 1) {
          currentQuantity -= 1;
          quantityDisplay.textContent = `${currentQuantity}`;
          const parent = container.parentElement;

          decreaseButton.disabled = true;
          increaseButton.disabled = true;

          try {
            await this.controller.updateQuantity((parent as HTMLElement).dataset.id as string, currentQuantity);
            await this.updateTotalPrice();
          } finally {
            decreaseButton.disabled = false;
            increaseButton.disabled = false;
          }
        }
      });

      increaseButton.addEventListener('click', async () => {
        let currentQuantity = Number(quantityDisplay.textContent);
        currentQuantity += 1;
        quantityDisplay.textContent = `${currentQuantity}`;
        const parent = container.parentElement;

        decreaseButton.disabled = true;
        increaseButton.disabled = true;

        try {
          await this.controller.updateQuantity((parent as HTMLElement).dataset.id as string, currentQuantity);
          await this.updateTotalPrice();
        } finally {
          decreaseButton.disabled = false;
          increaseButton.disabled = false;
        }
      });
    });

    const removeButtons = document.querySelectorAll('.basket-remove-button');
    removeButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const parent = button.parentElement;
        if (parent) {
          await this.controller.removeProductCart(parent.dataset.id as string);
          parent.remove();
          this.checkQuantityOfItems();
          await this.updateTotalPrice();
        }
      });
    });

    this.emptyBasket.addEventListeners();

    const promoCodeButton = document.querySelector('.checkout-button');
    promoCodeButton?.addEventListener('click', () => {
      const modalWindow = this.modalWindow.renderModalWindow();
      document.body.appendChild(modalWindow);
      this.modalWindow.addEventListeners();
    });
  }

  async updateTotalPrice() {
    const cartData = await this.controller.getCart();
    this.totalPrice = cartData?.totalPrice.centAmount ?? 0;
    const totalElement = document.querySelector('.total-price');
    if (totalElement) {
      totalElement.textContent = `Total: ${this.totalPrice / 100} €`;

      const discountOnTheTotalPrice = cartData?.discountOnTotalPrice?.discountedAmount?.centAmount;

      if (discountOnTheTotalPrice) {
        this.oldTotalPrice = discountOnTheTotalPrice + this.totalPrice;

        if (this.oldTotalPrice > 0) {
          totalElement.appendChild(
            HTMLCreator.createElement('span', { class: 'old-total-price' }, [`${this.oldTotalPrice / 100} €`])
          );
        }
      }
    }
  }

  checkQuantityOfItems() {
    const basketCards = document.querySelector('.basket__cards');
    if (basketCards && basketCards.childElementCount === 0) {
      const basketMain = document.querySelector('.basket-main') as HTMLElement;
      if (basketMain) {
        basketMain.innerHTML = '';
        basketMain.appendChild(this.emptyBasket.renderEmptyBasket());
        this.emptyBasket.addEventListeners();
      }
    }
  }
}
