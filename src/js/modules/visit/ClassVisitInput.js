import {Visit} from "./ClassVisit.js";

export class Input {
    constructor(props) {

        for (let key in props) {
            this[key] = props[key];
        }
    }

    render() {
        return Object.entries(this)
            .map(([key, value]) => {
                return `<div class="form-group">
                            <lable for="${key}">${value}</lable>
                            <input class="form-control visit-form-input" id="${key}" name="${key}">
                        </div>`
            }).join('');
    }
    static resetInput(input){
        input.value = '';
    }

    log() {
        this.inputs.forEach(item => {
            const newInput = new Input(item).log();
        })
    };
}