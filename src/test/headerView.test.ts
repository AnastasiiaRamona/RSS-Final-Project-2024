import Header from '../components/header/headerView';
import HTMLCreator from '../components/HTMLCreator';

jest.mock('../components/HTMLCreator');
jest.mock('../assets/dog.webp', () => 'dog.webp');
jest.mock('../assets/cat.webp', () => 'cat.webp');

describe('Header', () => {
  let header: Header;

  beforeEach(() => {
    document.body.innerHTML = '';
    header = new Header();
  });

  test('Should render the header with login button when not logged in', () => {
    (HTMLCreator.createElement as jest.Mock).mockImplementation(
      (tag: string, attrs: Record<string, string>, children: HTMLElement[]) => {
        const element = document.createElement(tag);
        if (attrs) {
          Object.keys(attrs).forEach((key) => {
            element.setAttribute(key, attrs[key]);
          });
        }
        if (children) {
          children.forEach((child: HTMLElement | string) => {
            if (typeof child === 'string') {
              element.textContent = child;
            } else {
              element.appendChild(child);
            }
          });
        }
        return element;
      }
    );

    const headerElement = header.renderHeader(false);
    document.body.appendChild(headerElement);

    expect(document.querySelector('.upper-dashboard__logout-button')?.textContent).toBe('Login');
  });

  test('Should render the header with logout button when logged in', () => {
    const headerElement = header.renderHeader(true);
    document.body.appendChild(headerElement);

    expect(document.querySelector('.upper-dashboard__logout-button')?.textContent).toBe('Log out');
  });

  test('Should add event listeners to login and registration buttons', () => {
    document.body.innerHTML = `
      <button class="upper-dashboard__logout-button">Login</button>
      <button class="upper-dashboard__register-button">Register</button>
    `;
    const dispatchEventMock = jest.fn();
    document.body.dispatchEvent = dispatchEventMock;

    header.addEventListeners();

    const loginButton = document.querySelector('.upper-dashboard__logout-button') as HTMLButtonElement;
    loginButton?.click();
    expect(dispatchEventMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'loginEvent' }));

    const registrationButton = document.querySelector('.upper-dashboard__register-button') as HTMLButtonElement;
    registrationButton?.click();
    expect(dispatchEventMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'registrationEvent' }));
  });
});
