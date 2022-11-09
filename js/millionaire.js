const question = document.getElementById('question');
const answers = document.getElementById('answers');
const questionBanner = document.getElementById('question-banner');
const balanceDisplay = document.getElementById('balance'); 
const fiftyFifty = document.getElementById('fifty-fifty');
const friendsHelp = document.getElementById('friends-help');
const back = document.getElementById('back');
const questionsCost = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let tempQuestions = data.easy; // перше йдуть найлегші питання
let balance = 0; // баланс у $
let score = 0; // кількість правильних відповідей
let rightAnswer = ''; // правильна відповідь на запитання ( string )
let right = 0; // 1 - правильна відповідь, 0 - неправильна
let questionIndex = 0;


generateQuestion();
answers.addEventListener('click', calculateClick);
fiftyFifty.addEventListener('click', fiftyFiftyFunc);
friendsHelp.addEventListener('click', friendsHelpFunc);
back.onclick = () => window.location = '../index.html';



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateQuestion() {
    questionIndex = getRandomInt(tempQuestions.length);
    rightAnswer = tempQuestions[questionIndex].answer;
    question.textContent = tempQuestions[questionIndex].question;
    const buttons = answers.querySelectorAll('.answer');
    const options = tempQuestions[questionIndex].options;
    for (let button of buttons) {
      button.style.visibility = 'visible';
      let optionIndex = getRandomInt(options.length - 1); // random опція вибору кожного разу
      button.textContent = options[optionIndex];
      options.splice(optionIndex, 1);
    }
    tempQuestions.splice(questionIndex, 1);
}

function highlightBalance() {
  const current = document.querySelector(`#right div:nth-child(${15 - score})`);
  const prev = document.querySelector(`#right div:nth-child(${16 - score})`);
  if (score < 15) {
    current.classList.add('highlighted');
    prev.classList.remove('highlighted');
  }
}

function calculateGuaranteedBalance() {
  if (score >= 5 && score < 10) balance = 1000;
  else if (score >= 10 && score < 15) balance = 32000;
}

function createModal() {
  const body = document.querySelector('body');
  const modal = document.createElement('div');
  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  const buttonWrapper = document.createElement('div');
  modal.setAttribute('id', 'modal');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  body.appendChild(modal);
  modal.appendChild(h2);
  modal.appendChild(p);
  modal.appendChild(buttonWrapper);
  buttonWrapper.appendChild(button1);
  buttonWrapper.appendChild(button2);
  h2.textContent = balance == 1000000 ? 'Ви виграли!':'Ви програли!';
  if (balance != 1000000) {
    p.textContent = balance ? `Ви зберегли свої $${balance}. Грати ще?` : 'На жаль, ви нічого не зберегли. Грати ще?';
  } else {
    p.textContent = `Вітаємо виграшем у $${balance}!`;
  }
  button1.textContent = 'Грати ще раз';
  button2.textContent = 'Вийти';
  button1.onclick = () => window.location.reload();
  button2.onclick = () => window.location = '../index.html';
  answers.removeEventListener('click', calculateClick);
}

function calculateClick(e) {
  if (e.target.classList.contains('answer')) {
    const BG_COLOR = e.target.backgroundColor;
    const temp = document.querySelectorAll('.answer');
    for (const option of temp) option.disabled = true;
    setTimeout(() => {
      if (e.target.textContent === rightAnswer) {
        right = 1;
        e.target.style.backgroundColor = 'green';
        score += 1;
        balance = questionsCost[score - 1];
        if (score == 15) {
          fiftyFifty.removeEventListener('click', fiftyFiftyFunc);
          createModal();
          return;
        }
      } else {
        e.target.style.backgroundColor = 'red';
        right = 0;
        calculateGuaranteedBalance();
      }
      if (score === 5) tempQuestions = data.medium;
      else if (score === 10) tempQuestions = data.hard;
      
    }, 2000);
    setTimeout(() => {
      if (!right) {
        fiftyFifty.removeEventListener('click', fiftyFiftyFunc);
        createModal();
        return;
      }
      generateQuestion();
      e.target.style.backgroundColor = 'rgb(6, 6, 57)';
      questionBanner.textContent = `Питання ${score + 1} із 15`;
      highlightBalance();
      for (let option of temp) option.disabled = false;
    }, 4000);
    }
}

function fiftyFiftyFunc(e) {
  const tempOptions = document.querySelectorAll('.answer');
  let rightAnswerIndex = 0;
  let wrongAnswerIndex = 0;
  for (let i = 0; i < tempOptions.length; i++) {
    if (tempOptions[i].textContent == rightAnswer) {
      rightAnswerIndex = i;
      break;
    }
  }
  wrongAnswerIndex = calculateNumberForHint(rightAnswerIndex);
  const arr = [rightAnswerIndex, wrongAnswerIndex];
  for (let i = 0; i < tempOptions.length; i++) {
    console.log(arr);
    if (!arr.includes(i)) {
      tempOptions[i].style.visibility = 'hidden';
    }
  }
  fiftyFifty.style.visibility = 'hidden';
}

function calculateNumberForHint(a) { // допоможна функція для 50 на 50 підказки
  const arr = [0, 1, 2, 3];
  arr.splice(a, 1);
  return arr[getRandomInt(2)]
}

function friendsHelpFunc(e) {
  friendsHelp.style.visibility = 'hidden';
  const body = document.querySelector('body');
  const modal = document.createElement('div');
  const button = document.createElement('button');
  const options = document.querySelectorAll('.answer');
  modal.setAttribute('id', 'friend-modal');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  body.appendChild(modal);
  h2.textContent = 'Відповідь друга';
  if (getRandomInt(10) > 8) p.textContent = `Друг подумав, і сказав, що правильна відповідь ${rightAnswer}.`;
  else p.textContent = `Друг сказав, що не знає, але йому здається, що відповідь ${options[getRandomInt(3)].textContent}.`;
  button.textContent = 'Окей';
  modal.appendChild(h2);
  modal.appendChild(p);
  modal.appendChild(button);
  button.onclick = () => modal.remove();
}