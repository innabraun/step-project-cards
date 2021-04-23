//сюда мы будем импортировать все


import { RegisterForm } from './client/components/form/registrationForm.js';

const registerForm = new RegisterForm().render();
document.querySelector('#root').append(registerForm);