import Footer from '../footer/footerView';
import Header from '../header/headerView';
import Login from '../login/loginView';
import Main from '../main/mainView';
import Registration from '../registration/registrationView';
import router from '../router';
import MissingPage from '../missingPage/missingPageView';

export default class App {
  private header: Header;

  private footer: Footer;

  private login: Login;

  private registration: Registration;

  private main: Main;

  private isLoggedIn: boolean = false;

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
    this.setupRouter();
  }

  render() {
    this.renderStartPage();
    this.changePageAlongThePath();
    this.setupEventListeners();
  }

  renderStartPage() {
    this.body.appendChild(this.header.renderHeader(this.isLoggedIn));
    this.body.appendChild(this.main.renderPage());
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
        this.changeHeaderElement(this.header.renderHeader(this.isLoggedIn));
        this.header.addEventListeners();
        renderFunction();
      });
    };

    renderRoute('/main', () => {
      this.changeMainElement(this.main.renderPage());
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
  }

  changePageAlongThePath() {
    const startingRoute = window.location.pathname.slice(1);
    const { routes } = this.router;

    if (startingRoute === '') {
      this.renderPageByRoute('main');
    } else if (routes[startingRoute]) {
      this.renderPageByRoute(startingRoute);
    } else {
      this.renderPageByRoute('404page', true);
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
}
