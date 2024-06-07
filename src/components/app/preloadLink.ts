export default class Preload {
  constructor() {
    const preloadImages = document.querySelectorAll('img');
    preloadImages.forEach((img) => {
      const imgPath = img.src;
      if (imgPath && imgPath !== '') {
        this.addPreloadLink(imgPath);
      }
    });
  }

  addPreloadLink(href: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  }
}
