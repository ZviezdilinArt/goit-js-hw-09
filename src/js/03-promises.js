import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};
refs.form.addEventListener('submit', showPromise);

function showPromise(evt) {
  evt.preventDefault();
  let delay = Number(refs.inputDelay.value);
  const step = Number(refs.inputStep.value);

  for (let i = 1; i <= Number(refs.inputAmount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
       if (shouldResolve) {
         resolve(object);
       } else {
         reject(object);
       }
    }, delay)
  });
}