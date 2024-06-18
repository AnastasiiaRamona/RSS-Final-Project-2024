import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';
import deleteButtonSrc from '../../assets/delete-icon.webp';
import promocodeIconSrc from '../../assets/promocode-icon.webp';
import clearIconSrc from '../../assets/clear-icon.webp';
import EmptyBasket from './componentsUI/emptyBasket';
import ModalWindow from './componentsUI/modalWindow';
import ExtendedLineItem from './componentsUI/types';

export default class Basket {
  controller: BasketController;

  newTotalPrice: number = 0;

  oldTotalPrice: number = 0;

  specialDiscountedPrice: number = 0;

  discountOnTheTotalPrice: number = 0;

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
    this.newTotalPrice = 0;
    this.newTotalPrice = cartData?.totalPrice?.centAmount ?? 0;
    this.discountOnTheTotalPrice = 0;
    if (cartData?.discountOnTotalPrice?.discountedAmount?.centAmount) {
      this.discountOnTheTotalPrice = cartData?.discountOnTotalPrice?.discountedAmount?.centAmount;
    }

    this.oldTotalPrice = 0;

    cartData?.lineItems?.forEach((item) => {
      const { quantity } = item;
      if (item.price.value.centAmount) {
        this.oldTotalPrice += item.price.value.centAmount * quantity;
      }
    });

    const lineItems = cartData?.lineItems as unknown as ExtendedLineItem[];
    lineItems.map((item) => {
      const id = item.productId;
      const name = item.name['en-US'];
      const imageUrl = item.variant.images?.[0]?.url as string;
      const price = item.price?.value.centAmount;
      const quantity = item?.quantity;

      const discountedPriceFromCommerceTools = item.price.discounted?.value?.centAmount;
      if (item.discountedPrice?.value?.centAmount) {
        this.specialDiscountedPrice = item.discountedPrice?.value?.centAmount;
      }

      const newPrice = this.calculateDiscount(price, this.specialDiscountedPrice, discountedPriceFromCommerceTools);
      const card = this.renderProductCard(id, name, imageUrl, price, quantity, newPrice);

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
      discountedPrice ? `${this.toFixedPrice(discountedPrice)} €` : `${this.toFixedPrice(price)} €`,
    ]);
    if (discountedPrice && price !== discountedPrice) {
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'basket-original-price' }, [`${this.toFixedPrice(price)} €`])
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
      `Total: ${this.toFixedPrice(this.newTotalPrice)} €`,
    ]);

    if (this.oldTotalPrice !== this.newTotalPrice) {
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'old-total-price' }, [`${this.toFixedPrice(this.oldTotalPrice)} €`])
      );
    }

    return HTMLCreator.createElement('section', { class: 'basket__summary' }, [
      HTMLCreator.createElement('h2', {}, ['Order Summary']),
      priceElement,
      HTMLCreator.createElement('p', { class: 'summary-description' }, [
        'Promo codes are waiting for you on the main page',
      ]),
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
          await this.controller.removeItemFromProductCart(parent.dataset.id as string);
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

    const clearButton = document.querySelector('.clear-button');
    clearButton?.addEventListener('click', async () => {
      await this.clearCart();
    });
  }

  async updateTotalPrice() {
    const cartData = await this.controller.getCart();

    this.oldTotalPrice = 0;
    cartData?.lineItems?.forEach((item) => {
      const price = item.price?.value?.centAmount;
      if (price) {
        this.oldTotalPrice += price * item.quantity ?? 0;
      }
    });

    this.newTotalPrice = 0;
    this.newTotalPrice = cartData?.totalPrice.centAmount ?? 0;
    const totalElement = document.querySelector('.total-price');
    if (totalElement) {
      totalElement.textContent = `Total: ${this.toFixedPrice(this.newTotalPrice)} €`;

      if (this.newTotalPrice !== this.oldTotalPrice) {
        totalElement.appendChild(
          HTMLCreator.createElement('span', { class: 'old-total-price' }, [
            `${this.toFixedPrice(this.oldTotalPrice)} €`,
          ])
        );
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

  async clearCart() {
    await this.controller.clearCart();
    const basketMain = document.querySelector('.basket-main') as HTMLElement;
    if (basketMain) {
      basketMain.innerHTML = '';
      basketMain.appendChild(this.emptyBasket.renderEmptyBasket());
      this.emptyBasket.addEventListeners();
    }
  }

  toFixedPrice(price: number) {
    return (price / 100).toFixed(2);
  }

  calculateDiscount(priceOfItem: number, specialDiscountedPrice?: number, discountedPriceFromCommerceTools?: number) {
    const multiplier = this.controller.findOutTheDiscountPercentage(this.newTotalPrice, this.discountOnTheTotalPrice);

    if (specialDiscountedPrice) {
      return specialDiscountedPrice * multiplier;
    }

    if (discountedPriceFromCommerceTools) {
      return discountedPriceFromCommerceTools * multiplier;
    }

    return priceOfItem * multiplier;
  }
}
