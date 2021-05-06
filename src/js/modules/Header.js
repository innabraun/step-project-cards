import logo from '../../img/pngwing.com.png';
import Form from './loginDialog/ClassForm';
import ClassForm from './loginDialog/ClassForm';
import { isTokenInLocalStorage } from './helper.js';
import logOut from '../../img/icons8-exit-100.png';
import doc from '../../img/white-man-doctor-in-the-medical-interior-of-the-hospital-holds-a-laptop-cartoon-person-3d-rendering_187882-1432.jpg';
import { RenderVisit } from './visit/ClassRenderVisit.js';
import { CreateVisit } from './visit/ClassCreateVisit.js';

export class Header extends Form {
  constructor(isToken) {
    super();
    this.isToken = isToken;
    this.elements = {
      parent: this.createElement('div', { className: 'header__section ' }),
      image: this.createElement('img', { className: 'logo', src: logo }),
      slogan: this.createElement('div', { className: 'slogan' }),
      buttonWrapper: this.createElement('div', { className: 'button' }),
      button: this.createElement('button', { className: 'button__item' }),
      icon: this.createElement('img', { className: 'icon__out', src: logOut }),
    };
  }

  createVisitOnClick = async () => {
    const value = document.getElementById('typeOfDoctor').value;
    const wrapper = document.getElementById('wrapper');
    const modal = document.getElementById('createVisitModal');
    if (
      value === 'dentist' ||
      value === 'therapist' ||
      value === 'cardiologist'
    ) {
      new RenderVisit(value).render(wrapper);
    } else if (!modal.classList.contains('show')) {
      new CreateVisit().clearInputs('wrapper');
    }

    // const submitVisitFormBtn = this.createFormButton('clen', 'class');
    // debugger;
    // submitVisitFormBtn.addEventListener('click', async function (e) {
    //   const card = await visitFormOnSubmit();
    //   console.log(card);
    // });

    // async function visitFormOnSubmit() {
    //   const card = await new CreateVisit().getObj('visit-form-input');
    //   const response = await new CreateVisit().formSubmit(card);

    //   console.log('Response --->', response);
    //   return response;
    // }
  };

  setModalDialog = async () => {
    const isToken = isTokenInLocalStorage();
    if (!isToken) {
      const classForm = new ClassForm().render();
      document.querySelector('.root').append(classForm);
    } else {
      const modalForm = document.getElementById('createVisitModal');
      const createVisitButton = document.getElementById('createVisitBtn');
      modalForm.style.display = 'block';
      modalForm.style.opacity = 1;
      createVisitButton.addEventListener('click', this.createVisitOnClick);
    }
  };

  setLogOut = () => {
    localStorage.removeItem('token');
    document.querySelector('.button__item').textContent = 'SIGN IN';
    const image = document.querySelector('.border__img');
    image.src = doc;
    document.querySelector('.no__cards-item').textContent = '';
  };

  render() {
    const {
      parent,
      image,
      slogan,
      buttonWrapper,
      button,
      icon,
    } = this.elements;
    button.addEventListener('click', this.setModalDialog);
    icon.addEventListener('click', this.setLogOut);

    buttonWrapper.append(button, icon);
    slogan.textContent = `Weill Cornell Internal Medicine Associates by st.Maria`;
    button.textContent = !this.isToken ? `SIGN IN` : 'CREATE VISIT';
    parent.append(image, slogan, buttonWrapper);
    return parent;
  }
}
