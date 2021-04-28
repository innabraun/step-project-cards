import {Visit} from "./ClassVisit.js";

export class VisitCardiologist extends Visit {
    constructor() {
        super();
        this.inputs = [
            {
                pressure: 'blood pressure',
                index: 'weight index',
                illnesses: 'previous illnesses',
                age: 'age'
            }
        ];
    }
}