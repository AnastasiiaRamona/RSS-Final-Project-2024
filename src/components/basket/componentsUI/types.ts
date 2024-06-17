import { DiscountedPrice, LineItem, Price } from '@commercetools/platform-sdk';

export default interface ExtendedLineItem extends LineItem {
  discountedPrice?: DiscountedPrice;
  price: Price;
}
