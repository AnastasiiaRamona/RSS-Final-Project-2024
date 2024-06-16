import HTMLCreator from '../../HTMLCreator';
import BasketController from '../basketController';

export default class ModalWindow {
  controller: BasketController;

  constructor() {
    this.controller = new BasketController();
  }

  renderModalWindow() {
    const modalWindow = HTMLCreator.createElement(
      'section',
      {
        class: 'modal-window-wrapper',
      },
      [
        HTMLCreator.createElement('div', { class: 'modal-window' }, [
          HTMLCreator.createElement('label', { for: 'promo-code', class: 'promo-code-label' }, ['Enter promo code:']),
          HTMLCreator.createElement('input', {
            type: 'text',
            id: 'promo-code',
            class: 'promo-code-input',
            placeholder: 'Promo-code',
          }),
          HTMLCreator.createElement('button', { class: 'apply-button' }, ['Apply']),
          HTMLCreator.createElement('p', { class: 'promo-code-important' }, [
            `Important! Promo codes can be combined. You can use one promo code only once.`,
          ]),
        ]),
      ]
    );
    return modalWindow;
  }

  addEventListeners() {
    console.log('Promo codes examples: 15%-1118907, 50%-300001, 2%-448921, 5%-320999');

    const modalWindowWrapper = document.querySelector('.modal-window-wrapper');
    modalWindowWrapper?.addEventListener('click', (event) => {
      if (event.target === modalWindowWrapper) {
        document.body.removeChild(modalWindowWrapper);
      }
    });

    const applyButton = document.querySelector('.apply-button');
    applyButton?.addEventListener('click', async () => {
      const promoCode = document.querySelector('.promo-code-input');
      if (promoCode) {
        const promoCodeValue = (promoCode as HTMLInputElement).value;
        const discountCode = await this.controller.getDiscountCodeByCode(promoCodeValue);
        if (discountCode && modalWindowWrapper) {
          const cart = await this.controller.getCart();
          const foundDiscountCode = cart?.discountCodes.find((dc) => dc.discountCode.id === discountCode.id);

          if (!foundDiscountCode) {
            const result = await this.controller.updateCartWithPromoCode(discountCode.code);
            document.body.removeChild(modalWindowWrapper);
            const updatedCart = await this.controller.getCart();
            const newTotalPrice = result.totalPrice.centAmount;
            const discountTotalPrice = updatedCart?.discountOnTotalPrice?.discountedAmount?.centAmount;
            const oldTotalPrice = newTotalPrice + (discountTotalPrice ?? 0);
            const totalPrice = document.querySelector('.total-price') as HTMLElement;
            totalPrice.textContent = `Total: ${this.toFixedPrice(newTotalPrice)} €`;
            totalPrice.appendChild(
              HTMLCreator.createElement('span', { class: 'old-total-price' }, [`${this.toFixedPrice(oldTotalPrice)} €`])
            );
            this.updatePrices(oldTotalPrice, newTotalPrice);
          } else {
            const message = HTMLCreator.createElement('p', { class: 'promo-code-message' }, [
              'The promo code has already been applied',
            ]);
            modalWindowWrapper?.appendChild(message);
            setTimeout(() => {
              modalWindowWrapper?.removeChild(message);
            }, 3000);
          }
        } else {
          const message = HTMLCreator.createElement('p', { class: 'promo-code-message' }, ['Promo code not found']);
          modalWindowWrapper?.appendChild(message);
          setTimeout(() => {
            modalWindowWrapper?.removeChild(message);
          }, 3000);
        }
      }
    });
  }

  updatePrices(oldTotalPrice: number, totalPrice: number) {
    const percentage = this.controller.findOutTheDiscountPercentage(oldTotalPrice, totalPrice) as number;
    const basketCards = document.querySelectorAll('.basket-product-card') as NodeListOf<HTMLElement>;
    basketCards.forEach(async (card) => {
      const cart = await this.controller.getCart();
      const product = cart?.lineItems.find((li) => li.productId === (card.dataset.id as string));
      const numberOfPrice = product?.price?.value.centAmount;
      const priceElement = card.querySelector('.basket-product-price') as HTMLElement;
      if (numberOfPrice) {
        priceElement.textContent = `${((numberOfPrice * percentage) / 10000).toFixed(2)} €`;
        priceElement.appendChild(
          HTMLCreator.createElement('span', { class: 'basket-original-price' }, [
            `${(numberOfPrice / 100).toFixed(2)} €`,
          ])
        );
      }
    });
  }

  toFixedPrice(price: number) {
    return (price / 100).toFixed(2);
  }
}
