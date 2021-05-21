import API from './ApiClass.js';
import {Header} from "./Header";
import logo from '../../img/pngwing.com.png';
import Form from './loginDialog/ClassForm';
import ClassForm from './loginDialog/ClassForm';
import { isTokenInLocalStorage } from './helper.js';
import logOut from '../../img/icons8-exit-100.png';
import doc from '../../img/white-man-doctor-in-the-medical-interior-of-the-hospital-holds-a-laptop-cartoon-person-3d-rendering_187882-1432.jpg';
import { RenderVisit } from './visit/ClassRenderVisit.js';
import { CreateVisit } from './visit/ClassCreateVisit.js';
import { getCardsBeforeBorder } from '..';

export class Cards {
  constructor({
                doctor,
                id,
                // status,
                urgency,
                purpose,
                name,
                details,
                pressure,
                index,
                illnesses,
                age,
                lastVisit,
              }) {
    this.doctor = doctor;
    this.id = id;
    this.purpose = purpose;
    this.name = name;
    this.details = details;

    // this.status = status;
    this.urgency = urgency;
    this.pressure = pressure;
    this.index = index;
    this.illnesses = illnesses;
    this.age = age;
    this.lastVisit = lastVisit;

    this.elements = {
      parent: document.createElement('div'),
      container: document.createElement('div'),
      doctor: document.createElement('p'),
      // status: document.createElement('p'),
      urgency: document.createElement('p'),
      purpose: document.createElement('p'),
      name: document.createElement('p'),
      details: document.createElement('p'),
      btn: document.createElement('button'),
      addInfo: document.createElement('div'),
    };
  }

  addAllCards = async () => {
    const data = await API.getRequest();

    if (data.length === 0 || data.length === undefined) {
      document.querySelector('#no-cards').classList.remove('display-none');
    } else {
      data.forEach((visit) => {
        const {
          doctor,
          id,
          // status,
          urgency,
          purpose,
          name,
          details,
          pressure,
          index,
          illnesses,
          age,
          lastVisit,
        } = visit;
        const item = new Cards(
            doctor,
            id,
            // status,
            urgency,
            purpose,
            name,
            details,
            pressure,
            index,
            illnesses,
            age,
            lastVisit,
            document.querySelector('#all-cards')
        );

        item.render();
      });
    }
  };

  handleClick() {
    // if (this.doctor === 'cardiologist') {
    //   this.addInfoCardio();
    // } else if (this.doctor === 'therapist') {
    //   this.addInfoCardio();
    // } else if (this.doctor === 'dentist') {
    //   this.addInfoCardio();
    // }
    this.addInfoCardio();
  }

  addInfoCardio() {

    const { btn, addInfo, container } = this.elements;
    btn.remove();
    const pressure = document.createElement('p');
    const index = document.createElement('p');
    const illnesses = document.createElement('p');
    const age = document.createElement('p');
    const lastVisit = document.createElement('p');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    // btnEdit.textContent = 'Edit'
    btnEdit.classList.add('button-filter__item')

    // btnDelete.textContent = 'Delete'
    btnDelete.classList.add('button-filter__item')

    btnEdit.textContent = 'EDIT';
    btnDelete.textContent = 'DELETE';
    if(this.pressure){
      pressure.textContent = 'Pressure: ' + this.pressure;
    }
    if(this.index){
      index.textContent = 'Weight index: ' + this.index;
    }
    if(this.illnesses){
      illnesses.textContent = 'Illnesses: ' + this.illnesses;
    }
    if(this.age){
      age.textContent = 'Age: ' + this.age;
    }
    if(this.lastVisit){
      lastVisit.textContent = 'Last visit: ' + this.lastVisit;
    }
    addInfo.append(
        pressure,
        index,
        illnesses,
        age,
        lastVisit,
        btnEdit,
        btnDelete
    );
    container.append(addInfo);
    btnDelete.addEventListener('click', () => this.btnDelete());
    btnEdit.addEventListener('click', ()=> this.btnEdit());
  }

  async btnDelete() {
    const id = this.id;
    try {
      await API.deleteRequest(id);
      document.querySelector(`[data-id='${id}']`).remove();
    } catch (err) {
      alert(err);
    }
  }

  async btnEdit(){
    const id = this.id;
    console.log(id);
    await new Header().setModalDialog();
    document.querySelector('#typeOfDoctor').value = this.doctor.toLowerCase()
    new Header().chooseDoctorOnClick();
    document.querySelector('#createVisitBtn').style.display = 'none';
    const btn = document.querySelector('#updateVisitBtn')
    btn.style.display = 'block';
    btn.addEventListener('click', ()=> this.btnUpdate())
  }

  async visitFormOnSubmitUpdate(){
    const card = new CreateVisit().getObj('visit-form-input');
    const response = await API.putRequest(card, this.id)
    // const response = await new CreateVisit().formSubmit(card);
    const modalForm = document.getElementById('createVisitModal');
    const inputsFrom = document.querySelectorAll('.inputsFrom');
    modalForm.style.display = 'none';
    modalForm.style.opacity = 0;
    inputsFrom.forEach((el) => {
      el.remove();
    });
    return response;
  }

  async btnUpdate(){
    await this.visitFormOnSubmitUpdate();
    document.getElementById('wrapper').style.display = 'none';
    await getCardsBeforeBorder();
    document.getElementById('chooseDoctorBtn').style.display = 'block';
    document.querySelector("footer").style.position="fixed"
  }

  render() {
    const {
      parent,
      urgency,
      container,
      doctor,
      purpose,
      name,
      btn,
      details,
    } = this.elements;
    doctor.textContent = 'Doctor: ' + this.doctor;
    urgency.textContent = 'Urgency: ' + this.urgency;
    purpose.textContent = 'Purpose: ' + this.purpose;
    name.textContent = 'Name: ' + this.name;
    details.textContent = 'Details: ' + this.details;
    btn.textContent = 'Show more';
    btn.classList.add('button-filter__item')
    btn.classList.add('button-show__item')
    parent.setAttribute('data-id', `${this.id}`);

    btn.addEventListener('click', () => this.handleClick());
    container.classList.add('card-container');
    container.append(doctor, urgency, purpose, name, details, btn);
    parent.append(container);
    return parent;
  }
}