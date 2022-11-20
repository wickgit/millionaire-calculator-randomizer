const display = document.getElementById('display');
const container = document.querySelector('.container');
const equal = document.getElementById('equal');
const dot = document.getElementById('dot');
const allClearButton = document.getElementById('AC');
const clear = document.getElementById('C');
const percent = document.getElementById('percent');
const back = document.getElementById('back');


const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operations = ['-', '+', '*', '/']
const other = ['AC', 'C', '%'];
let firstNumber = '';
let secondNumber = '';
let operation = '';
let currentNumber = 'first'; // число, в яке будуть записуватися числа


container.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'button') {
    if (numbers.includes(e.target.textContent)) {
      if (currentNumber === 'first' && firstNumber.indexOf('%' > 0) ||
         (currentNumber === 'second' && secondNumber.indexOf('%' > 0))) { // перевірка на знак відсотка

        addToDisplay(e.target.textContent);
        currentNumber == 'first' ? firstNumber += e.target.textContent : secondNumber += e.target.textContent;
      }
    } else if (operations.includes(e.target.textContent)) {
      if ((firstNumber != '' || firstNumber === 0) && secondNumber && operation) {
        // якщо перше число є, друге також, та є операція - вирахувати число, та записати його у firstNumber
        firstNumber = operate(operation, firstNumber, secondNumber).toString();
        currentNumber = 'second';
        secondNumber = '';
        display.textContent = '';
        addToDisplay(firstNumber);
        addToDisplay(e.target.textContent);
        operation = e.target.textContent;

      } else if (firstNumber != '' && operation == '') {
        addToDisplay(e.target.textContent);
        operation = e.target.textContent;
        currentNumber = 'second';
      }
    } else if (e.target.textContent === '%') {
      console.log(currentNumber);
      if (currentNumber == 'first' && firstNumber && !firstNumber.includes('%')) {
        display.textContent += '%';
        firstNumber += '%';
      } else if (currentNumber == 'second' && secondNumber && !secondNumber.includes('%')) {
        display.textContent += '%';
        secondNumber += '%';
      }
    }
  }
  console.log(firstNumber, secondNumber, ' операція: ', operation);
  console.log(firstNumber == '0');
});

function operate(operator, a, b) { // Операції
  a = a.toString();
  b = b.toString();
  if (a.indexOf('%') > 0 && b.indexOf('%') > 0) {
    a = +a.slice(0, -1);
    b = +b.slice(0, -1);
    return a + b + '%';
  } else if (a.indexOf('%') > 0) {
    a = (+a.slice(0, -1) / 100) * b;
  } else if (b.indexOf('%') > 0) {
    b = (+b.slice(0, -1) / 100) * a;
  }

  if (operator == '+') return (a*10 + b*10) / 10;
  else if (operator == '-') return (a*10 - b*10) / 10;
  else if (operator == '/') return (a*10 / b*10) / 10;
  else if (operator == '*') return (a*10 * b*10) / 100;
}



function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operation = '';
  display.textContent = '';
  currentNumber = 'first';
}

function removeCharacter() {
  if (display.textContent.length > 0) {
    const lastChar = display.textContent.charAt(display.textContent.length - 1);
    console.log(display.textContent, lastChar);
    if (numbers.includes(lastChar) || lastChar === '%' || lastChar === '.') {
      if (currentNumber === 'first') {
          firstNumber = firstNumber.slice(0, -1);
          display.textContent = display.textContent.slice(0, -1);
      } else {
          secondNumber = secondNumber.slice(0, -1);
          display.textContent = display.textContent.slice(0, -1);
      }
    } else if (operations.includes(lastChar)) {
      display.textContent = display.textContent.slice(0, -1);
      operation = '';
      currentNumber = 'first';
    }
  }
}

function addToDisplay(elem) {
  display.textContent += elem;
}

function showResult() { // Показати результат операції
  if ((firstNumber != '' || firstNumber === 0) && secondNumber && operation) {
    // якщо перше число є, друге також, та є операція - вирахувати число, та записати його у firstNumber
    firstNumber = operate(operation, firstNumber, secondNumber);
    currentNumber = 'second';
    secondNumber = '';
    display.textContent = firstNumber;
    operation = '';
  }
}

function addDot() { // Додавання крапки
  if (currentNumber === 'first' && firstNumber.indexOf('.' === -1)) {
    firstNumber += '.';
    display.textContent += '.';
  } else if (currentNumber === 'second' && secondNumber.indexOf('.' === -1)) {
    secondNumber += '.';
    display.textContent += '.';
  }
}



equal.onclick = showResult;
dot.onclick = addDot;
allClearButton.onclick = clearAll;
clear.onclick = removeCharacter;
back.onclick = () => window.location = '../index.html';
