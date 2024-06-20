import backgroundImage from '../../assets/background-image.webp';
import backgroundCat from '../../assets/cat-background-1.webp';
import backgroundDog from '../../assets/dog-background.webp';

export default class Preload {
  constructor() {
    const preloadImages = document.querySelectorAll('img');
    preloadImages.forEach((img) => {
      const imgPath = img.src;
      if (imgPath && imgPath !== '') {
        this.addPreloadLink(imgPath);
      }
    });

    this.addPreloadLink(backgroundImage);
    this.addPreloadLink(backgroundCat);
    this.addPreloadLink(backgroundDog);
  }

  addPreloadLink(href: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  }
}
