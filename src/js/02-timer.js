import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const datetimeInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const timerField = document.querySelectorAll('.field');
const timerValue = document.querySelectorAll('.value');
const timerLabel = document.querySelectorAll('.label');

const daysOnClockface = document.querySelector('span[data-days]');
const hoursOnClockface = document.querySelector('span[data-hours]');
const minutesOnClockface = document.querySelector('span[data-minutes]');
const secondsOnClockface = document.querySelector('span[data-seconds]');

let timerId = null;
startButton.disabled = true;

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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
};

flatpickr(datetimeInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // onOpen() {
    //     startButton.disabled = true;
    // },
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
            // window.alert("Please choose a date in the future");
            // startButton.disabled = true;
        }
        startButton.disabled = false;
            
        function newTimer() {
            const currentTime = new Date();
            localStorage.setItem('selectedData', selectedDates[0]);
            const selectedDate = new Date(localStorage.getItem('selectedData'));

            // if (!selectedDate) return;

            const deltaTime = selectedDate - currentTime;
            const timeComponents = convertMs(deltaTime);
            updateClockface(timeComponents);

            function updateClockface({ days, hours, minutes, seconds }) {
                daysOnClockface.textContent = days;
                hoursOnClockface.textContent = addLeadingZero(hours);
                minutesOnClockface.textContent = addLeadingZero(minutes);
                secondsOnClockface.textContent = addLeadingZero(seconds);
            };
            if (
                daysOnClockface.textContent === '0' &&
                hoursOnClockface.textContent === '0' &&
                minutesOnClockface.textContent === '0' &&
                secondsOnClockface.textContent === '0'
            ) {
                clearInterval(timerId);
            };
        };
        const onTick = () => {
            if (timerId) {
                clearInterval(timerId);
            }
            newTimer();
            startButton.disabled = true;
            datetimeInput.disabled = true;
            timerId = setInterval(newTimer, 1000);
        };
        startButton.addEventListener('click', onTick);
    },      
});







