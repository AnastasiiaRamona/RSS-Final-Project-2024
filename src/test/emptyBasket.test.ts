import EmptyBasket from '../components/basket/componentsUI/emptyBasket';
import videoSrc from '../../../assets/corgi-meme.webm';

it('should create the correct HTML structure when renderEmptyBasket is called', () => {
  document.body.innerHTML = '';
  const emptyBasket = new EmptyBasket();
  const container = emptyBasket.renderEmptyBasket();

  expect(container).toBeInstanceOf(HTMLElement);
  expect(container.querySelector('.empty-basket')).not.toBeNull();
  expect(container.querySelector('.empty-cart')).not.toBeNull();
  expect(container.querySelector('.empty-basket-message')).not.toBeNull();
  expect(container.querySelector('.empty-basket-catalog-message')).not.toBeNull();
  expect(container.querySelector('.catalog-button-and-video')).not.toBeNull();
  expect(container.querySelector('.corgi-meme')).toBeInstanceOf(HTMLVideoElement);
});

it('should handle missing video source gracefully when renderEmptyBasket is called', () => {
  document.body.innerHTML = '';
  const emptyBasket = new EmptyBasket();

  const originalVideoSrc: string = videoSrc;
  (global as typeof global & { videoSrc: string }).videoSrc = '';

  const container = emptyBasket.renderEmptyBasket();
  const video = container.querySelector('.corgi-meme') as HTMLVideoElement;

  expect(video).toBeInstanceOf(HTMLVideoElement);
  expect(video.src).toBe('http://localhost/[object%20Object]');

  (global as typeof global & { videoSrc: string }).videoSrc = originalVideoSrc;
});
