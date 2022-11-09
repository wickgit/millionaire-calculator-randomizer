const button = document.querySelector('button');
const startElem = document.getElementById('start');
const endElem = document.getElementById('end');
const quantityElem = document.getElementById('quantity');
const result = document.getElementById('result');
const checkbox = document.getElementById('unique-numbers');
const back = document.getElementById('back');

button.onclick = generateNumbers;
back.onclick = () => window.location = '../index.html';

function generateNumbers() {
  result.textContent = '';
  start = Number(startElem.value);
  end = Number(endElem.value);
  quantity = Number(quantityElem.value);
  if (start > 1000000000 || end > 1000000000) {
    result.textContent = 'Занадто великі числа.';
    return;
  }
  if (start > end) {
    result.textContent = 'Неправильний інтервал чисел.';
    return;
  }
  else if (quantity <= 0 || quantity > end - start) {
    console.log(quantity)
    result.textContent = 'Неправильна кількість чисел.';
    return;
  }


  if (checkbox.checked) {
    const mySet = new Set();
    while(mySet.size != quantity) {
      mySet.add(getRandomInt(start, end));
    }
    const arr = Array.from(mySet);
    console.log(arr);
    for (let elem of arr) {
      result.textContent += elem + ' ';
    }
  } else {
    for (let i = 0; i < quantity; i++) {
      result.textContent += getRandomInt(start, end) + ' ';
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}