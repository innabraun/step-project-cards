import {Visit} from "./ClassVisit.js";

export class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.inputs = [
            {
                pressure: 'Blood pressure',
                index: 'Weight index',
                illnesses: 'Previous illnesses',
                age: 'Age'
            }
        ];
    }
}