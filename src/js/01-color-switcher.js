const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', onChangeColor);
stopBtn.addEventListener('click', onChangeStop);


function onChangeColor() {
    startBtn.disabled = true;
    intervalId = setInterval(changeBodyColor, 1000);
    return intervalId;  
}

function onChangeStop() {
    clearInterval(intervalId);
    startBtn.disabled = false;
    body.style.backgroundColor = '#fafafa';
}

function changeBodyColor() {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}   