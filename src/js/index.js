//сюда мы будем импортировать все
//import {VisitForm} from "./modules/patientForm/ClassRegistration"
import "../style.css"

import {Header} from "./modules/Header";
import ClassForm from "./modules/patientForm/ClassForm";

const header= new Header().render()
document.querySelector(".header").insertAdjacentHTML("afterbegin", header)

const classForm=new ClassForm().render()

document.querySelector(".root").append(classForm)

//import { RegisterForm } from './client/components/form/registrationForm.js';

//const registerForm = new RegisterForm().render();

// const registerForm = new VisitForm().render();
//
// document.querySelector('#root').append(registerForm);