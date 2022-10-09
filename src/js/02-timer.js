
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

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
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
function updateClockface({ days, hours, minutes, seconds }) {
    const daysOnClockface = document.querySelector('span[data-days]');
    const hoursOnClockface = document.querySelector('span[data-hours]');
    const minutesOnClockface = document.querySelector('span[data-minutes]');
    const secondsOnClockface = document.querySelector('span[data-seconds]');
    daysOnClockface.textContent = `${addLeadingZero(days)}`;
    hoursOnClockface.textContent = `${addLeadingZero(hours)}`;
    minutesOnClockface.textContent = `${addLeadingZero(minutes)}`;
    secondsOnClockface.textContent = `${addLeadingZero(seconds)}`;
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const datetimeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.value');
const timerLabel = document.querySelectorAll('.label');

datetimeInput.style.cssText += "width:150px;height:30px;padding:3px;font-size:15px;";
startButton.style.cssText += "width:60px;height:30px;padding:3px;font-size:15px;";
timer.style.cssText += "display:flex;gap:15px;";
timerField.forEach((field) => { 
    field.style.cssText += "display:flex;flex-direction:column;align-items:center;";
});
timerValue.forEach((value) => { 
    value.style.cssText += "font-size:30px;";
});
timerLabel.forEach((label) => { 
    label.style.cssText += "text-transform:uppercase;font-size:10px;";
});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() {
        startButton.disabled = true;
    },
    onClose(selectedDates) {
        const currentDate = new Date();
        if (selectedDates[0] > currentDate) {
            startButton.disabled = false;
        } else {
            Notiflix.Notify.failure("Please choose a date in the future");
            // window.alert("Please choose a date in the future");
            startButton.disabled = true;
        }
    },
};
flatpickr(datetimeInput, options);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.onTick = onTick;
    }
    start() {
        const startTime = Date.now();
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const timeComponents = convertMs(deltaTime)
            this.onTick(timeComponents);
        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
    }
}

const newTimer = new Timer({
    onTick: updateClockface
});

startButton.addEventListener('click', onClickButton);
startButton.disabled = true;
function onClickButton() { 
    startButton.disabled = true;
    datetimeInput.disabled = true;
    newTimer.start();
};

// const body = document.querySelector('body');
// body.addEventListener('click', onBodyClick);
// function onBodyClick({ target }) {
//     if (target === timer || target === body) {
//         datetimeInput.disabled = false;
//         newTimer.stop();
//     }
// }
