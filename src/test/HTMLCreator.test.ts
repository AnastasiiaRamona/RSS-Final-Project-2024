import HTMLCreator from '../components/HTMLCreator';

describe('HTMLCreator', () => {
  test('createElement creates an element with correct attributes and no children', () => {
    const tagName = 'div';
    const attributes = { id: 'test-id', class: 'test-class' };

    const element = HTMLCreator.createElement(tagName, attributes);

    expect(element.tagName.toLowerCase()).toBe(tagName);
    expect(element.getAttribute('id')).toBe('test-id');
    expect(element.getAttribute('class')).toBe('test-class');
    expect(element.children.length).toBe(0);
  });

  test('createElement creates an element with children elements', () => {
    const tagName = 'div';
    const attributes = {};
    const child1 = document.createElement('span');
    const child2 = document.createElement('p');

    const element = HTMLCreator.createElement(tagName, attributes, [child1, child2]);

    expect(element.children.length).toBe(2);
    expect(element.children[0]).toBe(child1);
    expect(element.children[1]).toBe(child2);
  });

  test('createElement creates an element with text children', () => {
    const tagName = 'div';
    const attributes = {};
    const childText1 = 'Hello';
    const childText2 = 'World';

    const element = HTMLCreator.createElement(tagName, attributes, [childText1, childText2]);

    expect(element.childNodes.length).toBe(2);
    expect(element.childNodes[0].textContent).toBe(childText1);
    expect(element.childNodes[1].textContent).toBe(childText2);
  });

  test('createElement creates an element with mixed children', () => {
    const tagName = 'div';
    const attributes = {};
    const child1 = document.createElement('span');
    const childText = 'Hello';
    const child2 = document.createElement('p');

    const element = HTMLCreator.createElement(tagName, attributes, [child1, childText, child2]);

    expect(element.childNodes.length).toBe(3);
    expect(element.childNodes[0]).toBe(child1);
    expect(element.childNodes[1].textContent).toBe(childText);
    expect(element.childNodes[2]).toBe(child2);
  });

  test('createElement skips null and undefined children', () => {
    const tagName = 'div';
    const attributes = {};
    const child1 = document.createElement('span');
    const child2 = document.createElement('p');

    const element = HTMLCreator.createElement(tagName, attributes, [child1, null, child2, undefined]);

    expect(element.children.length).toBe(2);
    expect(element.children[0]).toBe(child1);
    expect(element.children[1]).toBe(child2);
  });
});
