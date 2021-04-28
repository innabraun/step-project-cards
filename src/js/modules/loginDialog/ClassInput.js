import { Component } from './FormComponents.js';

export default class Input extends Component {
    constructor(props,setState) {
        super();
        this.props=props;


    }


    render() {

        const { ...attr } = this.props;
        const element = this.createElement('input',attr);

        // element.addEventListener('input', this.setState);


        return element;
    }
}