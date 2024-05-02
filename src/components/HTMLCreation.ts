export default class HTMLCreation {
  static createElement(
    tagName: string,
    attributes: { [key: string]: string },
    children: (HTMLElement | HTMLInputElement | string | null | undefined)[] = [],
  ): HTMLElement | HTMLInputElement {
    const element = document.createElement(tagName);

    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });

    children.forEach((child) => {
      if (!child) {
        return;
      }
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  }
}