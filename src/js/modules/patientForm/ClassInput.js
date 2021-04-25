import { Component } from './FormComponents.js';

export default class Input extends Component {
constructor(props,setState) {
    super();
    this.props=props;
    this.setState=setState;

}
    createFormButton(text, className) {
        const submitButton = this.createElement('button', {}, text);
        submitButton.classList.add(className);
        return submitButton;
    }




    render() {

        const { ...attr } = this.props;
        const element = this.createElement('input',attr);

            element.addEventListener('input', this.setState);

        this.elem = element;
        return element;
    }
}
