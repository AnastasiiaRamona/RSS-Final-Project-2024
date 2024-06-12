import Header from '../header/headerView';
import Login from '../login/loginView';
import Main from '../main/mainView';
import Registration from '../registration/registrationView';
import router from '../router';
import MissingPage from '../missingPage/missingPageView';
import Catalog from '../catalog/catalogView';
import DetailedProduct from '../detailedProduct/detailedProductView';
import HTMLCreator from '../HTMLCreator';
import UserProfile from '../userProfile/userProfileView';
import AppButtonsMethods from './appButtonsMethods';
import AppSwiper from './swiper';
import AboutPage from '../about/aboutView';
import Footer from '../footer/footerView';
import Preload from './preloadLink';
import CommerceToolsAPI from '../commerceToolsAPI';
import Basket from '../basket/basketView';

export default class App {
  private preload: Preload | null = null;

  private header: Header;

  private login: Login;

  private registration: Registration;

  private main: Main;

  private catalog: Catalog;

  private aboutUs: AboutPage;

  private basket: Basket;

  private footer: Footer;

  private isLoggedIn: boolean = !!localStorage.getItem('userToken');

  private router = router;

  private missingPage: MissingPage;

  private body = document.body;

  private productId: string | null = null;

  private appButtonsMethods: AppButtonsMethods | null = null;

  private buttonsArray: HTMLButtonElement[] = [];

  private appSwiper: AppSwiper;

  private commerceToolsAPI: CommerceToolsAPI;

  private userId: string | null = null;

  constructor() {
    this.header = new Header();
    this.login = new Login();
    this.registration = new Registration();
    this.main = new Main();
    this.missingPage = new MissingPage();
    this.catalog = new Catalog();
    this.aboutUs = new AboutPage();
    this.basket = new Basket();
    this.footer = new Footer();
    this.appButtonsMethods = new AppButtonsMethods();
    this.appSwiper = new AppSwiper();
    this.commerceToolsAPI = new CommerceToolsAPI();
    const isCartIdExist = !!localStorage.getItem('cartPetShopId');
    if (!isCartIdExist) {
      if (this.userId) {
        this.commerceToolsAPI.createCart(this.userId).then(() => {});
      } else {
        this.commerceToolsAPI.createCart().then(() => {});
      }
    }
  }

  render() {
    this.userId = localStorage.getItem('userPetShopId');
    this.renderStartPage();
    this.changePageAlongThePath();
    this.setupEventListeners();
    this.setupRouter();
    this.preload = new Preload();
  }

  async renderStartPage() {
    this.body.appendChild(this.header.renderHeader(this.isLoggedIn));
    this.header.addBurgerButton();
    this.header.addEventListeners();
    const main = HTMLCreator.createElement('main', { class: 'main-field' });
    this.body.appendChild(main);
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
    this.body.addEventListener('userProfileEvent', () => {
      this.router.navigateTo('/user-profile');
    });
    this.body.addEventListener('productEvent', ((event: CustomEvent) => {
      this.productId = event.detail.id;

      if (this.productId) {
        this.router.navigateTo(`/product?id=${this.productId}`);
      }
    }) as EventListener);
    this.body.addEventListener('aboutUsEvent', () => {
      this.router.navigateTo('/about-us');
    });
    this.body.addEventListener('basketEvent', () => {
      this.router.navigateTo('/basket');
    });
  }

  changeMainElement(element: HTMLElement) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = element.innerHTML;
    }
  }

  private setupRouter() {
    const {
      loginButton,
      registrationButton,
      mainButton,
      catalogButton,
      userProfileButton,
      title,
      aboutUsButton,
      basketButton,
    } = this.findButtons();
    const renderRoute = (path: string, renderFunction: () => void) => {
      this.router.addRoute(path, async () => {
        this.isLoggedIn = !!localStorage.getItem('userToken');
        this.header.changeLoginButtonToTheLogOutButton(this.isLoggedIn);
        this.header.checkUserProfileButton(this.isLoggedIn, userProfileButton);
        renderFunction();
      });
    };

    renderRoute('/main', () => {
      this.changeMainElement(this.main.renderPage());
      if (title) {
        this.appButtonsMethods?.toggleButton(mainButton, this.buttonsArray, true);
      } else {
        this.appButtonsMethods?.toggleButton(mainButton, this.buttonsArray);
      }
    });

    renderRoute('/login', () => {
      this.changeMainElement(this.login.renderPage());
      this.login.addEventListeners();
      this.appButtonsMethods?.toggleButton(loginButton, this.buttonsArray);
    });

    renderRoute('/registration', () => {
      this.changeMainElement(this.registration.renderPage());
      this.registration.addEventListeners();
      this.appButtonsMethods?.toggleButton(registrationButton, this.buttonsArray);
    });

    renderRoute('/catalog', async () => {
      this.changeMainElement(await this.catalog.renderPage());
      this.catalog.addEventListeners();
      this.appButtonsMethods?.toggleButton(catalogButton, this.buttonsArray);
    });

    renderRoute('/product?id=id', async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      if (productId) {
        const product = new DetailedProduct(productId);
        this.changeMainElement(product.renderMain());
        await product.addEventListeners();
        this.appSwiper.createSwiper();
        this.appButtonsMethods?.activateButton(catalogButton);
      }
    });

    renderRoute('/user-profile', async () => {
      this.isLoggedIn = !!localStorage.getItem('userToken');
      if (this.isLoggedIn) {
        const userProfile = new UserProfile();
        this.changeMainElement(await userProfile.renderPage());
        userProfile.addEventListeners();
        this.appButtonsMethods?.toggleButton(userProfileButton, this.buttonsArray);
      }
    });

    renderRoute('/about-us', () => {
      this.changeMainElement(this.aboutUs.renderAboutPage());
      this.appButtonsMethods?.toggleButton(aboutUsButton, this.buttonsArray);
    });

    renderRoute('/basket', async () => {
      this.changeMainElement(await this.basket.renderPage());
      this.basket.addEventListeners();
      this.appButtonsMethods?.toggleButton(basketButton, this.buttonsArray);
    });
  }

  changePageAlongThePath() {
    const currentRoute = window.location.pathname;
    const isProductPage = currentRoute.startsWith('/product');
    if (isProductPage) {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      if (productId) {
        this.renderPageByRoute(`product?id=${productId}`);
        return;
      }
    }

    const startingRoute = currentRoute.slice(1);
    const { routes } = this.router;

    this.isLoggedIn = !!localStorage.getItem('userToken');

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
      case 'user-profile':
        if (this.isLoggedIn) {
          this.renderPageByRoute('user-profile');
        } else {
          this.renderPageByRoute('login');
        }
        break;
      case 'about-us':
        this.renderPageByRoute('about-us');
        break;
      case 'basket':
        this.renderPageByRoute('basket');
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

  async renderPageByRoute(route: string, keepURL: boolean = false) {
    if (!keepURL) {
      this.router.navigateTo(`/${route}`);
    } else if (route === '404page') {
      this.isLoggedIn = !!localStorage.getItem('userToken');
      const userProfileButton = document.querySelector('.user-profile-button') as HTMLButtonElement;
      this.header.checkUserProfileButton(this.isLoggedIn, userProfileButton);
      this.changeMainElement(this.missingPage.renderPage());
    } else {
      const { routes } = this.router;
      if (routes[`/${route}`]) {
        routes[`/${route}`]();
      }
    }
  }

  findButtons() {
    const loginButton = document.querySelector('.upper-dashboard__logout-button') as HTMLButtonElement;
    const registrationButton = document.querySelector('.upper-dashboard__register-button') as HTMLButtonElement;
    const mainButton = document.querySelector('.main-button') as HTMLButtonElement;
    const catalogButton = document.querySelector('.catalog-button') as HTMLButtonElement;
    const userProfileButton = document.querySelector('.user-profile-button') as HTMLButtonElement;
    const title = document.querySelector('.title') as HTMLButtonElement;
    const aboutUsButton = document.querySelector('.about-us-button') as HTMLButtonElement;
    const basketButton = document.querySelector('.basket-button') as HTMLButtonElement;

    this.buttonsArray.push(
      loginButton,
      registrationButton,
      mainButton,
      catalogButton,
      userProfileButton,
      title,
      aboutUsButton,
      basketButton
    );
    return {
      loginButton,
      registrationButton,
      mainButton,
      catalogButton,
      userProfileButton,
      title,
      aboutUsButton,
      basketButton,
    };
  }
}
