
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datetimeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.value');
const timerLabel = document.querySelectorAll('.label');
console.log(timer.children);


timer.style.cssText += "display:flex;gap:15px;";
timerField.forEach((field) => { 
    field.style.cssText += "display:flex;flex-direction:column;align-items:center;";
});
timerValue.forEach((value) => { 
    value.style.cssText += "font-size: 30px;";
});
timerLabel.forEach((label) => { 
    label.style.cssText += "text-transform:uppercase;font-size: 10px;";
});

// timerField[0].style.cssText += "display:flex;gap:5px;flex-direction:column;align-items:center;";
// timerField[1].style.cssText += "display:flex;gap:5px;flex-direction:column;align-items:center;";
// timerField[2].style.cssText += "display:flex;gap:5px;flex-direction:column;align-items:center;";
// timerField[3].style.cssText += "display:flex;gap:5px;flex-direction:column;align-items:center;";

// timerField.style.boxShadow = "(0 3px 4px 0 rgba(0, 0, 0, .2),inset 2px 4px 0 0 rgba(255, 255, 255, .08));"
// border-radius: 8px; 
//     @include box-shadow(0 3px 4px 0 rgba(0, 0, 0, .2),inset 2px 4px 0 0 rgba(255, 255, 255, .08));
// timerField.style.cssText += "display:flex;gap:10px;";

//    Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты.  
//    Добавь минимальное оформление элементов интерфейса.
//    Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно 
// выбрать конечную дату и время в одном элементе интерфейса.
//==============
// Выбор даты​
//==============
//    Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента 
// интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную 
// пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый 
// элемент.
//   - Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом 
// "Please choose a date in the future".
//   - Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
//   - Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату 
// в будущем.
//   - При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента 
// нажатия.
//================
// Отсчет времени
//================
//    При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени 
// осталось до указанной даты и обновлять интерфейс таймера, показывая 
// четыре цифры: дни, часы, минуты и секунды в формате xx: xx: xx: xx.
//   - Количество дней может состоять из более чем двух цифр.
//   - Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
//   - Для подсчета значений используй готовую функцию convertMs, где ms - разница между 
// конечной и текущей датой в миллисекундах.
//========================
// Форматирование времени​
//========================
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты. 
// Обрати внимание, что она не форматирует результат. То есть, если осталось 4 минуты или 
// любой другой составляющей времени, то функция вернет 4, а не 04. В интерфейсе таймера 
// необходимо добавлять 0 если в числе меньше двух символов. 
// Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед 
// отрисовкой интефрейса форматируй значение.
//==============================
// Библиотека уведомлений
//==============================
// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.
