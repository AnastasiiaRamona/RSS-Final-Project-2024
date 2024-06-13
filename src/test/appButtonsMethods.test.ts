// AppButtonsMethods.test.ts
import AppButtonsMethods from '../components/app/appButtonsMethods';

describe('AppButtonsMethods', () => {
  let appButtonsMethods: AppButtonsMethods;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;
  let button3: HTMLButtonElement;

  beforeEach(() => {
    appButtonsMethods = new AppButtonsMethods();

    // Создаем кнопки для тестирования
    button1 = document.createElement('button');
    button2 = document.createElement('button');
    button3 = document.createElement('button');

    // Добавляем кнопки в виртуальный DOM
    document.body.appendChild(button1);
    document.body.appendChild(button2);
    document.body.appendChild(button3);
  });

  afterEach(() => {
    // Удаляем кнопки после каждого теста
    button1.remove();
    button2.remove();
    button3.remove();
  });

  test('disableButton should disable the button and add "clicked" class', () => {
    appButtonsMethods.disableButton(button1);
    expect(button1.disabled).toBe(true);
    expect(button1.classList.contains('clicked')).toBe(true);
  });

  test('activateButton should activate the button and remove "clicked" class', () => {
    // Предварительно деактивируем кнопку
    button2.disabled = true;
    button2.classList.add('clicked');

    appButtonsMethods.activateButton(button2);
    expect(button2.disabled).toBe(false);
    expect(button2.classList.contains('clicked')).toBe(false);
  });

  test('toggleButton should toggle buttons correctly based on activeButton', () => {
    // Предварительно деактивируем кнопки 2 и 3
    button2.disabled = true;
    button2.classList.add('clicked');
    button3.disabled = true;
    button3.classList.add('clicked');

    appButtonsMethods.toggleButton(button1, [button1, button2, button3]);
    expect(button1.disabled).toBe(true);
    expect(button1.classList.contains('clicked')).toBe(true);
    expect(button2.disabled).toBe(false);
    expect(button2.classList.contains('clicked')).toBe(false);
    expect(button3.disabled).toBe(false);
    expect(button3.classList.contains('clicked')).toBe(false);

    appButtonsMethods.toggleButton(button2, [button1, button2, button3]);
    expect(button1.disabled).toBe(false);
    expect(button1.classList.contains('clicked')).toBe(false);
    expect(button2.disabled).toBe(true);
    expect(button2.classList.contains('clicked')).toBe(true);
    expect(button3.disabled).toBe(false);
    expect(button3.classList.contains('clicked')).toBe(false);

    appButtonsMethods.toggleButton(button3, [button1, button2, button3]);
    expect(button1.disabled).toBe(false);
    expect(button1.classList.contains('clicked')).toBe(false);
    expect(button2.disabled).toBe(false);
    expect(button2.classList.contains('clicked')).toBe(false);
    expect(button3.disabled).toBe(true);
    expect(button3.classList.contains('clicked')).toBe(true);
  });
});
