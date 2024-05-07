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
  }

  renderStartPage() {
    document.body.appendChild(this.header.renderHeader(this.isLoggedIn));
    this.header.addEventListeners();
    document.body.appendChild(this.main.renderPage());
    document.body.appendChild(this.footer.renderFooter());
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('loginEvent', () => {
      this.isLoggedIn = true;
      this.router.navigateTo('/login');
    });
  }

  // rerenderPage() {
  //   switch (true) {
  //     case this.login.isLoginButtonClicked:
  //       this.router.navigateTo('/main');
  //       this.login.isLoginButtonClicked = false;
  //       break;
  //     case this.main.logOutButtonClicked:
  //       this.router.navigateTo('/login');
  //       this.main.logOutButtonClicked = false;
  //       break;
  //     case this.main.registerButtonClicked:
  //       this.router.navigateTo('/registration');
  //       this.main.registerButtonClicked = false;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  changeMainElement(element: HTMLElement) {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = element.innerHTML;
    }
  }

  private setupRouter() {
    this.router.addRoute('/main', () => {
      this.changeMainElement(this.main.renderPage());
      // this.main.addEventListeners();
    });
    this.router.addRoute('/login', () => {
      this.changeMainElement(this.login.renderPage());
      // this.login.addEventListeners();
    });
    this.router.addRoute('/registration', () => {
      this.changeMainElement(this.registration.renderPage());
      // this.registration.addEventListeners();
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
