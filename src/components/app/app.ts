import { Fancybox } from '@fancyapps/ui';
import Swiper from 'swiper';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import Footer from '../footer/footerView';
import Header from '../header/headerView';
import Login from '../login/loginView';
import Main from '../main/mainView';
import Registration from '../registration/registrationView';
import router from '../router';
import MissingPage from '../missingPage/missingPageView';
import DetailedProduct from '../detailedProduct/detailedProductView';
import Catalog from '../catalog/catalogView';
import HTMLCreator from '../HTMLCreator';

export default class App {
  private header: Header;

  private footer: Footer;

  private login: Login;

  private registration: Registration;

  private main: Main;

  private catalog: Catalog;

  private product: DetailedProduct;

  private isLoggedIn: boolean = !!localStorage.getItem('userToken');

  private router = router;

  private missingPage: MissingPage;

  private body = document.body;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.login = new Login();
    this.registration = new Registration();
    this.main = new Main();
    this.missingPage = new MissingPage();
    this.catalog = new Catalog();
    this.product = new DetailedProduct('c4734136-b505-4157-b12f-ee1e1fcfe9a0');
  }

  render() {
    this.renderStartPage();
    this.changePageAlongThePath();
    this.setupEventListeners();
    this.setupRouter();
  }

  renderStartPage() {
    this.body.appendChild(this.header.renderHeader(this.isLoggedIn));
    const main = HTMLCreator.createElement('main', { class: 'main-field' });
    this.body.appendChild(main);
    this.body.appendChild(this.footer.renderFooter());
  }

  setupEventListeners() {
    this.body.addEventListener('loginEvent', () => {
      this.router.navigateTo('/login');
    });
    this.body.addEventListener('registrationEvent', () => {
      this.router.navigateTo('/registration');
    });
    this.body.addEventListener('backEvent', () => {
      window.history.back();
    });
    this.body.addEventListener('mainPageEvent', () => {
      this.router.navigateTo('/main');
    });
    this.body.addEventListener('catalogEvent', () => {
      this.router.navigateTo('/catalog');
    });
  }

  changeHeaderElement(element: HTMLElement) {
    const header = document.querySelector('header');
    if (header) {
      header.innerHTML = element.innerHTML;
    }
  }

  changeMainElement(element: HTMLElement) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = element.innerHTML;
    }
  }

  private setupRouter() {
    const renderRoute = (path: string, renderFunction: () => void) => {
      this.router.addRoute(path, () => {
        this.isLoggedIn = !!localStorage.getItem('userToken');
        this.changeHeaderElement(this.header.renderHeader(this.isLoggedIn));
        this.header.addEventListeners();
        renderFunction();
      });
    };

    renderRoute('/main', () => {
      this.changeMainElement(this.main.renderPage());
      this.header.addBurgerButton();
      this.main.addEventListeners();
    });

    renderRoute('/login', () => {
      this.changeMainElement(this.login.renderPage());
      this.header.changeLoginButtonToBackButton();
      this.header.addMainPageButton();
      this.login.addEventListeners();
    });

    renderRoute('/registration', () => {
      this.changeMainElement(this.registration.renderPage());
      this.header.changeRegistrationButtonToBackButton();
      this.header.addMainPageButton();
      this.registration.addEventListeners();
    });

    renderRoute('/catalog', async () => {
      this.changeMainElement(await this.catalog.renderPage());
      this.header.addBackButton();
    });

    renderRoute('/product', async () => {
      this.changeMainElement(this.product.renderMain());
      await this.product.getProductInformation();
      this.createSwiper();
      this.header.addBackButton();
    });
  }

  changePageAlongThePath() {
    const startingRoute = window.location.pathname.slice(1);
    const { routes } = this.router;

    switch (startingRoute) {
      case '':
      case 'main':
        this.renderPageByRoute('main');
        break;
      case 'login':
        this.renderPageByRoute(this.isLoggedIn ? 'main' : 'login');
        break;
      case 'registration':
        this.renderPageByRoute('registration');
        break;
      case 'catalog':
        this.renderPageByRoute('catalog');
        break;
      case 'product':
        this.renderPageByRoute('product');
        break;
      default:
        if (routes[startingRoute]) {
          this.renderPageByRoute(startingRoute);
        } else {
          this.renderPageByRoute('404page', true);
        }
        break;
    }
  }

  renderPageByRoute(route: string, keepURL: boolean = false) {
    if (!keepURL) {
      this.router.navigateTo(`/${route}`);
    } else {
      this.changeHeaderElement(this.header.renderHeader(this.isLoggedIn));
      this.header.addEventListeners();
      this.header.addMainPageButton();
      this.header.addBackButton();
      if (route === '404page') {
        this.changeMainElement(this.missingPage.renderPage());
      } else {
        const { routes } = this.router;
        if (routes[`/${route}`]) {
          routes[`/${route}`]();
        }
      }
    }
  }

  createSwiper() {
    const swiper = new Swiper('.swiper', {
      // configure Swiper to use modules
      modules: [Navigation, Pagination, Zoom],
      grabCursor: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    Fancybox.bind('[data-fancybox]', {
      // Your custom options
    });

    return swiper;
  }
}
