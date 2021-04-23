//Инны

import Input from '../patientForm/ClassInput';
import Form from '../patientForm/ClassForm';

export class VisitForm extends Form {
    loginProps = {
        type: 'text',
        name: 'user-login',
        required: true,
        className: 'form-control',
        placeholder: 'Введите login',
        errorText: 'Enter login!',
    };

    emailProps = {
        type: 'email',
        name: 'user-email',
        required: true,
        className: 'form-control',
        placeholder: 'Введите email',
        errorText: 'Enter email!',
    };

    postReq() {
        fetch(url)
            .then(res => res.text())
            .then(data => {
                localStorage.setItem('token', data);
            });
    }

    getReq() {}

    render() {
        this.handleSubmit(this.postReq);
        const { loginProps, emailProps, passwordProps, passwordRepeatProps, btnSubmit } = this;
        const form = super.render(this.props);
        form.append(new Input(loginProps).render(), new Input(emailProps).render());
        return form;
    }
}
