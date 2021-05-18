import { Input } from './ClassVisitInput.js';
import { VisitCardiologist } from './VisitCardio.js';
import { VisitTherapist } from './VisitTherapist.js';
import { VisitDentist } from './VisitDentist.js';
import { Visit } from './ClassVisit.js';

export class RenderVisit {
  constructor(doctor) {
    this.doctor = doctor;
  }

  render(element) {
    let inputField = `${new Visit().renderInputs()} ${new Visit().renderSelect()}`;
    if (this.doctor === 'cardiologist') {
      new VisitCardiologist().inputs.forEach((item) => {
        inputField += new Input(item).render();
      });
    } else if (this.doctor === 'therapist') {
      new VisitTherapist().inputs.forEach((item) => {
        inputField += new Input(item).render();
      });
    } else if (this.doctor === 'dentist') {
      new VisitDentist().inputs.forEach((item) => {
        inputField += new Input(item).render();
      });
    }
    element.innerHTML = inputField;
  }
}
