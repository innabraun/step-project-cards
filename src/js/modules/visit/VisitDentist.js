import { Visit } from './ClassVisit.js';

export class VisitDentist extends Visit {
  constructor() {
    super();
    this.inputs = [
      {
        lastVisit: 'Date of last visit',
      },
    ];
  }
}
