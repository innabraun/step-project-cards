import {Select} from "./ClassVisitSelect.js";
import {Input} from "./ClassVisitInput.js";

export class Visit {

    constructor() {
    }

    inputs = [
        {
            purpose: 'Purpose of visit',
            name:'Full name',
            info: 'Visit info'
        }
    ];

    render (element) {
        let inputField = ''

        this.inputs.forEach(item => {
            inputField += new Input(item).render();
        })

        return inputField;
    };

    renderSelect(element) {
        return new Select().render();

    };
}


