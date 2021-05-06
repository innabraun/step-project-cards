import { Visit } from './ClassVisit.js';

export class VisitDentist extends Visit {
  constructor() {
    super();
    this.inputs = [
      {
        lastVisit: 'date of last visit',
      },
    ];
  }
}
