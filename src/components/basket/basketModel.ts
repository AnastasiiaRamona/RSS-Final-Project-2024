import {
  CartChangeLineItemQuantityAction,
  CartUpdate,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class BasketModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getCart() {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    const cart = await this.commerceToolsAPI.getCart(cartId);
    return cart;
  }

  async removeProductCart(productId: string) {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    const { currentCartVersion, lineItemId } = await this.getLineItemId(productId, cartId);
    if (lineItemId) {
      const result = await this.commerceToolsAPI.removeProductCart(cartId, lineItemId, currentCartVersion);
      return result;
    }
    return undefined;
  }

  async updateQuantity(productId: string, quantity: number) {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const { currentCartVersion, lineItemId } = await this.getLineItemId(productId, cartId);

        if (lineItemId) {
          const updateData: CartUpdate = {
            version: currentCartVersion,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId,
                quantity,
              } as CartChangeLineItemQuantityAction,
            ],
          };
          await this.commerceToolsAPI.updateCart(cartId, updateData);
          break;
        } else {
          throw new Error('Line item not found');
        }
      } catch (error: Error | unknown) {
        if (error instanceof Error && error.message.includes('ConcurrentModification')) {
          retryCount += 1;
          if (retryCount >= maxRetries) {
            throw new Error('ConcurrentModification: Maximum retry attempts exceeded.');
          }
        } else {
          throw error;
        }
      }
    }
  }

  async getLineItemId(productId: string, cartId: string) {
    const currentCart = await this.commerceToolsAPI.getCart(cartId);
    const currentCartVersion = Number(currentCart?.body.version);
    const lineItemId = currentCart?.body.lineItems.find((item) => item.productId === productId)?.id;
    return { currentCartVersion, lineItemId };
  }
}
