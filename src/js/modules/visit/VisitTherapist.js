import {Visit} from "./ClassVisit.js";

export class VisitTherapist extends Visit {
    constructor() {
        super();
        this.inputs = [
            {
                age: 'age'
            }
        ];
    }
}