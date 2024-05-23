import HTMLCreation from '../HTMLCreation';

import '../libs/libs';
// Импорт изображений
import slider1 from '../../assets/slider-1.jpg';
import slider2 from '../../assets/slider-2.jpg';
import slider3 from '../../assets/slider-3.jpg';
import slider4 from '../../assets/slider-4.jpg';
import slider5 from '../../assets/slider-5.jpg';
import slider6 from '../../assets/slider-6.jpg';

export default class DetailedProductPage {
  renderMain() {
    const { body } = document;
    const main = HTMLCreation.createElement('main', { class: 'detailled__product' }, [
      HTMLCreation.createElement('div', { class: 'detailled__product-container' }, [
        HTMLCreation.createElement('div', { class: 'detailled__product-wrapper' }),
      ]),
    ]);
    body.appendChild(main);

    document.querySelector('.detailled__product-wrapper')?.insertAdjacentHTML(
      'afterbegin',
      `<div class="swiper">
        <div class="swiper-wrapper">
          <picture class="swiper-slide" lazy="true">
                  
            <img  src="${slider1}" alt="Изображение"  loading="lazy" data-fancybox="gallery"/>
          
          </picture>

          <picture class="swiper-slide" lazy="true">
                
            <img  src="${slider2}" alt="Изображение" loading="lazy"  data-fancybox="gallery" />
     
          </picture>
      
          <picture class="swiper-slide" lazy="true">
                  
            <img  src="${slider3}" alt="Изображение"  loading="lazy" data-fancybox="gallery"/>
          
          </picture>

          <picture class="swiper-slide" lazy="true">
                   
            <img  src="${slider4}" alt="Изображение"  loading="lazy" data-fancybox="gallery"/>
          
          </picture>

          <picture class="swiper-slide" lazy="true">
                   
            <img  src="${slider5}" alt="Изображение"  loading="lazy" data-fancybox="gallery"/>
          
          </picture>

          <picture class="swiper-slide" lazy="true">
          
            <img  src="${slider6}" alt="Изображение"  loading="lazy" data-fancybox="gallery"/>
          
          </picture>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>        
      </div>
      <div class="detailled__product-content">
         <h1 class="detailled__product-title">Title</h1>
         <p class="detailled__product-description">
         Dfffffffffffffffffffffffffffffffffffffffffdsdsesddd
         dddddddffsdssdsfsdfffdddddddsssssssssffeeessssfdffeeertegfgrrgrdffg
         </p>
         <div class="detailled__product-price">20.00$</div>
         <div class="detailled__product-discount">20.00$</div>
         <button class="detailled__product-basket">Add to Basket</button>

      </div>`
    );
  }
}

const lol = new DetailedProductPage();
lol.renderMain();
