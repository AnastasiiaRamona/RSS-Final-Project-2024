import Footer from '../footer/footerView';
import Header from '../header/headerView';
import Login from '../login/loginView';
import Main from '../main/mainView';
import Registration from '../registration/registrationView';
import router from '../router';

export default class App {
  private header: Header;

  private footer: Footer;

  private login: Login;

  private registration: Registration;

  private main: Main;

  private isLoggedIn: boolean = false;

  private router = router;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.login = new Login();
    this.registration = new Registration();
    this.main = new Main();
    this.setupRouter();
  }

  render() {
    this.renderStartPage();
    this.changePageAlongThePath();
    this.setupEventListeners();
  }

  renderStartPage() {
    document.body.appendChild(this.header.renderHeader(this.isLoggedIn));
    document.body.appendChild(this.main.renderPage());
    document.body.appendChild(this.footer.renderFooter());
  }

  setupEventListeners() {
    document.body.addEventListener('loginEvent', () => {
      this.router.navigateTo('/login');
    });
    document.body.addEventListener('registrationEvent', () => {
      this.router.navigateTo('/registration');
    });
    document.body.addEventListener('backEvent', () => {
      const previousPath = sessionStorage.getItem('previousPath');
      if (previousPath) {
        this.router.navigateTo(previousPath);
      } else {
        this.router.navigateTo('/main');
      }
    });
    document.body.addEventListener('mainPageEvent', () => {
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
        const previousPath = sessionStorage.getItem('currentPath');
        sessionStorage.setItem('previousPath', previousPath || '/main');
        sessionStorage.setItem('currentPath', path);

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

    if (routes[startingRoute]) {
      this.renderPageByRoute(startingRoute);
    } else {
      const defaultRoute = startingRoute === 'login' || startingRoute === 'registration' ? startingRoute : 'main';
      this.renderPageByRoute(defaultRoute);
    }
  }

  renderPageByRoute(route: string) {
    this.router.navigateTo(`/${route}`);
  }
}
