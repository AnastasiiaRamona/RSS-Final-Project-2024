import './global.scss';

// For test

console.log('Hello World');

const h1 = document.createElement('h1');
h1.textContent = 'Hello';
document.body.appendChild(h1);

function sum(a: number, b: number): string {
  return String(a + b);
}

export default sum;
