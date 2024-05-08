class Router {
  routes: Record<string, () => void>;

  constructor() {
    this.routes = {};
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
    window.addEventListener('load', this.handleRouteChange.bind(this));
  }

  addRoute(route: string, handler: () => void) {
    this.routes[route] = handler;
  }

  private handleRouteChange() {
    const currentRoute = window.location.pathname;
    const handler = this.routes[currentRoute];
    if (handler) {
      handler();
    }
  }

  navigateTo(route: string) {
    const absoluteRoute = route.startsWith('/') ? route : `/${route}`;
    window.history.pushState(null, '', absoluteRoute);
    this.handleRouteChange();
  }
}

const router = new Router();
export default router;
