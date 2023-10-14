import { throttle } from 'lodash';

// Пошук елементів на сторінці
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state'; // Ключ для сховища

// Додаємо слухача події input до форми
form.addEventListener(
  'input',
  throttle(e => {

  
    const objectToSave = { email: email.value, message: message.value };

   
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500) 
);


form.addEventListener('submit', e => {

  e.preventDefault(); 

  
  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }


  console.log({ email: email.value, message: message.value });

  form.reset(); 
  localStorage.removeItem(LOCALSTORAGE_KEY); 
});


const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

  
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {

   
    console.error('Get state error: ', error.message);
  }
};


const storageData = load(LOCALSTORAGE_KEY);

// Перевірка стану сховища.
// Якщо  в сховищі є збережені дані - заповнити ними поля форми.
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
} // В іншому випадку поля будуть порожніми

