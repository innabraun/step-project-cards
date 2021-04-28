import { Component } from './FormComponents.js';
import API from "../ApiClass.js";
import Input from "./ClassInput.js"
import {Header} from "../Header.js";



export default class Form extends Component {


    serializeInputs = () => {
        const data = {};
        const fieldsInputs = document.querySelectorAll('.form-control');
        fieldsInputs.forEach(({ name ,value}) => {
            data[name] = value;
        });
        return data;///получаем данные с инпутов
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const dataFromInputs = this.serializeInputs();
        console.log(dataFromInputs)
        try {
            await API.login(dataFromInputs)//данные с даты, получаем метод логин
            document.querySelector(".button__item").textContent="CREATE VISIT"
            // TODO save token with API.saveToken()
        } catch(e){

        }
    };
    loginProps = {
        type: 'text',
        name: 'email',
        required: true,
        className: 'form-control',
        placeholder: 'Email',

    };

    passwordProps = {
        type: 'password',
        name: 'password',
        required: true,
        className: 'form-control',
        placeholder: 'Password',

    };

    createFormButton(text, className) {
        const submitButton = this.createElement('button', {}, text);
        submitButton.classList.add(className);
        return submitButton;
    }

    render() {
        console.log(this.state);
        const form=this.createElement("form");
        form.classList.add("form__class")
        form.addEventListener("submit",this.handleSubmit)

        this.formWrapper=this.createElement("div",{className:"form__wrapper"})
        this.formWrapper.addEventListener('click', e => {
            if (e.target.classList.contains('form__wrapper')) {
                this.formWrapper.remove();
            }
        });

        const button=this.createFormButton("Submit","button__class");
        form.append(
            new Input(this.loginProps).render(),
            new Input(this.passwordProps).render(),
            button)
        this.formWrapper.append(form);
        return this.formWrapper;
    }
}
