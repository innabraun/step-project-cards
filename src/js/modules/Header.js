import logo from '../../img/pngwing.com.png';
import Form from './loginDialog/ClassForm';
import ClassForm from './loginDialog/ClassForm';
import { isTokenInLocalStorage } from './helper.js';
import logOut from '../../img/icons8-exit-100.png';
import doc from '../../img/white-man-doctor-in-the-medical-interior-of-the-hospital-holds-a-laptop-cartoon-person-3d-rendering_187882-1432.jpg';
import { RenderVisit } from './visit/ClassRenderVisit.js';
import { CreateVisit } from './visit/ClassCreateVisit.js';
import { getCardsBeforeBorder } from '..';

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
      icon: this.createElement('img', {
        className: this.isToken ? 'exit__btn' : 'icon__out exit__btn',
        src: logOut,
      }),
    };
  }
  async visitFormOnSubmit() {
    const card = new CreateVisit().getObj('visit-form-input');
    const response = await new CreateVisit().formSubmit(card);
    const modalForm = document.getElementById('createVisitModal');
    const inputsFrom = document.querySelectorAll('.inputsFrom');
    modalForm.style.display = 'none';
    modalForm.style.opacity = 0;
    inputsFrom.forEach((el) => {
      el.remove();
    });
    return response;
  }
  createVisitOnClick = async () => {
    await this.visitFormOnSubmit();
    document.getElementById('wrapper').style.display = 'none';
    await getCardsBeforeBorder();
    document.getElementById('chooseDoctorBtn').style.display = 'block';
    document.getElementById('createVisitBtn').style.display = 'none';
    document.querySelector("footer").style.position="fixed"
  };

  chooseDoctorOnClick = () => {
    document.getElementById('wrapper').style.display = 'block';
    document.getElementById('chooseDoctorBtn').style.display = 'none';
    document.getElementById('createVisitBtn').style.display = 'block';

    const value = document.getElementById('typeOfDoctor').value;
    const wrapper = document.getElementById('wrapper');
    const inputsFrom = document.querySelector('.inputsFrom');
    const modal = document.getElementById('createVisitModal');
    const createVisitBtn = document.getElementById('createVisitBtn');

    wrapper.append(inputsFrom);
    if (
      value === 'dentist' ||
      value === 'therapist' ||
      value === 'cardiologist'
    ) {
      new RenderVisit(value).render(inputsFrom);
    } else if (!modal.classList.contains('show')) {
    }
    createVisitBtn.addEventListener('click', this.createVisitOnClick);
  };

  onCloseVisitModal = () => {
    const modalForm = document.getElementById('createVisitModal');
    modalForm.style.display = 'none';
    modalForm.style.opacity = 0;
  };

  setModalDialog = async () => {
    const isToken = isTokenInLocalStorage();
    if (!isToken) {
      const classForm = new ClassForm().render();
      document.querySelector('.root').append(classForm);
    } else {
      const modalForm = document.getElementById('createVisitModal');
      const close = document.getElementById('modalVisitCloseButton');
      const chooseDoctorBtn = document.getElementById('chooseDoctorBtn');
      const inputsFrom = this.createElement('div', { className: 'inputsFrom' });
      const wrapper = document.getElementById('wrapper');
      wrapper.append(inputsFrom);
      modalForm.style.display = 'block';
      modalForm.style.opacity = 1;
      chooseDoctorBtn.addEventListener('click', this.chooseDoctorOnClick);
      close.addEventListener('click', this.onCloseVisitModal);
    }
  };

  setLogOut = () => {
    localStorage.removeItem('token');
    document.querySelector('.button__item').textContent = 'SIGN IN';
    const image = document.querySelector('.border__img');
    const borderCards = document.querySelector('.border__cards');
    image.style.display = 'block';
    image.src = doc;
    document.querySelector('.exit__btn').classList.add('icon__out');
    document.querySelector('.icon__out').style.display = 'none';
    if (borderCards) {
      document.querySelector('.border__cards').innerHTML = '';
    }
    document.querySelector('.no__cards-item').textContent = '';
    document.querySelector("footer").style.position="";
  };


  render() {
    const { parent, image, slogan, buttonWrapper, button, icon } =
      this.elements;
    button.addEventListener('click', this.setModalDialog);
    icon.addEventListener('click', this.setLogOut);
    buttonWrapper.append(button, icon);
    slogan.textContent = `Weill Cornell Internal Medicine Associates by st.Maria`;
    button.textContent = !this.isToken ? `SIGN IN` : 'CREATE VISIT';
    parent.append(image, slogan, buttonWrapper);
    return parent;
  }
}
