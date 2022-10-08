
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onButtonStart);
stopBtn.addEventListener('click', onButtonStop);

function onButtonStart() {
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function onButtonStop() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

//    Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> 
// на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета 
// фона должно останавливаться.
//    Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока 
// изменение темы запушено, кнопка «Start» была не активна (disabled).
//   Для генерации случайного цвета используй функцию getRandomHexColor.
