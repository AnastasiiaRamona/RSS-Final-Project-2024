import HTMLCreator from '../../HTMLCreator';
import BasketController from '../basketController';
import ExtendedLineItem from './types';

export default class ModalWindow {
  controller: BasketController;

  oldTotalPrice: number = 0;

  newTotalPrice: number = 0;

  discountOnTheTotalPrice: number = 0;

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
    console.log(
      'Promo codes examples: 1118907 - скидка 15% на всё, 300001 - скидка 5% на всё, 448921 - скидка 20% на всё, 320999 - скидка 5% на Bee Costume'
    );

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
            const updatedCartItems = updatedCart?.lineItems as unknown as ExtendedLineItem[];

            this.discountOnTheTotalPrice = 0;
            this.newTotalPrice = 0;
            this.newTotalPrice = result.totalPrice.centAmount;
            if (updatedCart?.discountOnTotalPrice?.discountedAmount?.centAmount) {
              this.discountOnTheTotalPrice = updatedCart?.discountOnTotalPrice?.discountedAmount?.centAmount;
            }

            this.oldTotalPrice = 0;

            updatedCartItems.forEach((item) => {
              const { quantity } = item;
              if (item.price.value.centAmount) {
                this.oldTotalPrice += item.price.value.centAmount * quantity;
              }
            });

            updatedCartItems.forEach((li) => {
              if (li.price.value.centAmount) {
                const cards = document.querySelectorAll('.basket-product-card') as NodeListOf<HTMLElement>;
                cards.forEach((card) => {
                  if (card.dataset.id === li.productId) {
                    if (li.discountedPrice && li.price.value.centAmount !== li.discountedPrice.value.centAmount) {
                      const discountPrice = li.discountedPrice?.value.centAmount;
                      const priceOfItem = li.price.value.centAmount;
                      const newPriceOfItem = this.calculateDiscount(priceOfItem, discountPrice);
                      this.updatePriceForCardWithPromoCode(card, newPriceOfItem, priceOfItem);
                    } else if (li.price.value.centAmount !== li.price.discounted?.value?.centAmount) {
                      const discountedPrice = li.price.discounted?.value?.centAmount;
                      const priceOfItem = li.price.value.centAmount;
                      const newPriceOfItem = this.calculateDiscount(priceOfItem, undefined, discountedPrice);
                      this.updatePriceForCardWithPromoCode(card, newPriceOfItem, priceOfItem);
                    } else {
                      const priceOfItem = li.price.value.centAmount;
                      const newPriceOfItem = this.calculateDiscount(priceOfItem);
                      if (priceOfItem !== newPriceOfItem) {
                        this.updatePriceForCardWithPromoCode(card, newPriceOfItem, priceOfItem);
                      }
                    }
                  }
                });
              }
            });

            this.updateTotalPrice();

            if (this.oldTotalPrice === this.newTotalPrice) {
              this.renderMessageAboutMissingItemInCart();
              const spanOldTotalPrice = document.querySelector('.old-total-price');
              spanOldTotalPrice?.remove();
            }
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

  updatePriceForCardWithPromoCode(card: HTMLElement, discountedPrice: number, originalPrice: number) {
    if (discountedPrice !== originalPrice) {
      const priceElement = card.querySelector('.basket-product-price') as HTMLElement;
      priceElement.textContent = `${this.toFixedPrice(discountedPrice)} €`;
      priceElement.appendChild(
        HTMLCreator.createElement('span', { class: 'basket-original-price' }, [`${this.toFixedPrice(originalPrice)} €`])
      );
    }
  }

  toFixedPrice(price: number) {
    return (price / 100).toFixed(2);
  }

  renderMessageAboutMissingItemInCart() {
    const modalWindowWrapper = HTMLCreator.createElement('section', { class: 'modal-window-wrapper' }, [
      HTMLCreator.createElement('div', { class: 'modal-window' }, [
        HTMLCreator.createElement('p', { class: 'message-about-missing-item' }, [
          `It appears that the item you are looking for is not in your cart yet. You still need to add the item to your cart, but don't worry—the promo code has already been added. Just add the desired product to your cart.`,
        ]),
      ]),
    ]);
    document.body.appendChild(modalWindowWrapper);
    modalWindowWrapper.addEventListener('click', (event) => {
      if (event.target === modalWindowWrapper) {
        document.body.removeChild(modalWindowWrapper);
      }
    });
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

  updateTotalPrice() {
    const totalPriceElement = document.querySelector('.total-price') as HTMLElement;
    totalPriceElement.textContent = `Total: ${this.toFixedPrice(this.newTotalPrice)} €`;
    totalPriceElement.appendChild(
      HTMLCreator.createElement('span', { class: 'old-total-price' }, [`${this.toFixedPrice(this.oldTotalPrice)} €`])
    );
  }
}
