import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');

let delayInp = null;
let stepInp = null;
let amountInp = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!event.target.tagName === 'BUTTON') return;
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delayInp = Number(delay.value);
  stepInp = Number(step.value);
  amountInp = Number(amount.value);

  for (let i = 1; i <= amountInp; i++) {

    createPromise(i, delayInp)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInp += stepInp;
  }
  event.currentTarget.reset();
};

formEl.addEventListener('submit', onFormSubmit);

//    В HTML есть разметка формы, в поля которой пользователь будет вводить первую задержку 
// в миллисекундах, шаг увеличения задержки для каждого промиса после первого и количество 
// промисов которое необходимо создать.
//    Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) 
// столько раз, сколько ввели в поле amount. 
// При каждом вызове передай ей номер создаваемого промиса(position) и задержку учитывая 
// введенную пользователем первую задержку(delay) и шаг(step).
//    Дополни код функции createPromise так, чтобы она возвращала один промис, который 
// выполянется или отклоняется через delay времени.
//  Значением промиса должен быть объект, в котором будут свойства position и delay со 
// значениями одноименных параметров.
//  Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить 
// или отклонить.
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
//    Для отображения уведомлений пользователю вместо console.log() используй библиотеку 
// notiflix.
