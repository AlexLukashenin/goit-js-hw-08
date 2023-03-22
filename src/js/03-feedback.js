import throttle from 'lodash.throttle';
//змінна для зберігання ключа
const STORAGE_KEY = 'feedback-form-state';

const formData = {};
// Пошук елементів на сторінці

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const email = document.querySelector('input[name="email"]');

// Додаємо слухача події input до форми
form.addEventListener(
  'input',
  throttle(e => {
    // Об'єкт з полями email і message, у яких зберігаються поточні значення полів форми
    const formData = { email: email.value, message: textarea.value };

    // Записування у локальне сховище об'єкта з полями.
    // JSON.stringify - конвертування JS-значень у формат строки JSON.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);
// Додаємо слухача події submit до форми
form.addEventListener('submit', e => {
  e.preventDefault();

  console.log({ email: email.value, message: textarea.value });
  // очищення поля форми
  form.reset();
  // очищення сховища
  localStorage.removeItem(STORAGE_KEY);
});

// Метод load для абстрагування повторюваного коду та перевірки помилок парса
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// Присвоєння ключа до сховища
const storageData = load(STORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  textarea.value = storageData.message;
}
