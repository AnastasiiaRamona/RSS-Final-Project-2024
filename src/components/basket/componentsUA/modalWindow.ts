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
        ]),
      ]
    );
    return modalWindow;
  }

  addEventListeners() {
    console.log('Example of promo-code: 15%-1118907');

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

            const newTotalPrice = result.totalPrice.centAmount / 100;
            const totalPrice = document.querySelector('.total-price') as HTMLElement;
            totalPrice.textContent = `${newTotalPrice} €`;
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
}
