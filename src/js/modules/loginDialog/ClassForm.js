import { Component } from './FormComponents.js';
import API from "../ApiClass.js";
import Input from "./ClassInput.js"
import doc2 from "../../../img/male-african-doctor-in-the-medical-interior-of-the-hospital-open-palm-copy-space-cartoon-person_187882-1244.jpg"
import gif from "../../../img/1489.gif"


export default class Form extends Component {

    serverErrors={
        loginError:`Incorrect username or password`
    }

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
        document.querySelector(".loader").style.display="block"
        const dataFromInputs = this.serializeInputs();
        const messageText=document.querySelector(".message__text");

        try {
           const getData= await API.login(dataFromInputs)//данные с даты, получаем метод логин
            if (this.serverErrors.loginError===getData){
                document.querySelector(".loader").style.display="none"
                messageText.textContent="something wrong"
                throw new Error(this.serverErrors.loginError)
            }


            localStorage.setItem('token', getData);
            document.querySelector(".border__img").src=doc2
            document.querySelector(".button__item").textContent="CREATE VISIT"


            setTimeout(()=>{
                document.querySelector(".form__wrapper").remove()
                document.querySelector(".loader").style.display="none"
            },2500)

            const cards = await API.getRequest()
            if (cards.length===0){
                //to do myzik
                document.querySelector(".no__cards-item").textContent="No items have been added"
                return
            }
            // TODO save token with API.saveToken()
        } catch(e){
            console.log(e)
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

    createLoader=()=>{
        const loader=this.createElement("div",{className:"loader"})
        const loaderInner=this.createElement("img",{className:"loader__inner",src:gif})
        loader.append(loaderInner)
        return loader
    }

    render() {
        const form=this.createElement("form");
        form.classList.add("form__class")
        form.addEventListener("submit",this.handleSubmit)
        const messageText=this.createElement("span",{className:"message__text"})
        this.formWrapper=this.createElement("div",{className:"form__wrapper"})
        this.formWrapper.addEventListener('click', e => {
            if (e.target.classList.contains('form__wrapper')) {
                this.formWrapper.remove();

            }
        });


        const button=this.createFormButton("SUBMIT","button__class");
        form.append(
            new Input(this.loginProps).render(),
            new Input(this.passwordProps).render(),
            button,
            messageText,
            this.createLoader()
        )

        this.formWrapper.append(form);
        return this.formWrapper;
    }
}
