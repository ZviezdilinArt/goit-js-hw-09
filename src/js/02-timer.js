import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');


let choseTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choseTime = selectedDates[0];
    if (options.defaultDate > choseTime) {
      buttonStart.setAttribute('disabled', 'disabled');
      Notify.warning('Please choose a date in the future');
      return;
    }
    if (options.defaultDate < choseTime) {
      buttonStart.removeAttribute('disabled', 'disabled');
    }
  },
};

flatpickr('input#datetime-picker', options);
buttonStart.addEventListener('click', startTimer);

function startTimer() {
  setInterval(() => {
    const currentTime = new Date();
    const diff = choseTime - currentTime;
    const resultTime = convertMs(diff);

    days.textContent = addLeadingZero(resultTime.days);
    hours.textContent = addLeadingZero(resultTime.hours);
    minutes.textContent = addLeadingZero(resultTime.minutes);
    seconds.textContent = addLeadingZero(resultTime.seconds);
  }, 1000);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}