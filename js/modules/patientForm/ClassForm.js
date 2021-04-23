import { Component } from '../patientForm/FormComponents';

export default class Form extends Component {
    handleSubmit = (callback, e) => {
        e.preventDefault();
        const {submitType, action, funcSubmit} = this.props;
        console.log('Submit', funcSubmit);
        const body = submitType === 'urlencoded' ? this.serialize : this.serializeJSON;
        funcSubmit(action, body);

        //funcSubmit - post request
    };

    render() {
        const {funcSubmit, submitType, ...attr} = this.props;
        const form = this.createElement('form', attr);
        form.addEventListener('submit', this.handleSubmit);
        this.form = form;
        return this.form;
    }

    serialize() {
        const allInputs = document.querySelectorAll('.form-control');
        const obj = {
            title: value,
        };
        allInputs.forEach(({name, value}) => {
            obj[name] = value;
        });

        return JSON.stringify(obj);
    }

}