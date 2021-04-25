import { Component } from './FormComponents.js';

import Input from "./ClassInput.js"

export default class Form extends Component {
    state={login:"",password:""}
   setState =(obj)=>{
       this.state={...this.state,...obj}

   }
    setLogin=(e)=>{
       const value=e.target.value
        this.setState({login:value})
    }
    setPassword =(e)=>{
        const value=e.target.value
        this.setState({password:value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)


        //funcSubmit - post request
    };
    loginProps = {
        type: 'text',
        name: 'user-login',
        required: true,
        className: 'form-control',
        placeholder: 'Введите login',

    };

    passwordProps = {
        type: 'password',
        name: 'user-password',
        required: true,
        className: 'form-control',
        placeholder: 'Введите пароль',

    };

    createFormButton(text, className) {
        const submitButton = this.createElement('button', {}, text);
        submitButton.classList.add(className);
        return submitButton;
    }

    render() {
        const form=this.createElement("form");
        form.addEventListener("submit",this.handleSubmit)
        const button=this.createFormButton("Submit","buttonClass");
        form.append(new Input(this.loginProps,this.setLogin).render(),new Input(this.passwordProps,this.setPassword).render(),button)
        this.form = form;
        return this.form;
    }

}
