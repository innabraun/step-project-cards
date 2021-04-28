//сюда мы будем импортировать все
//import {VisitForm} from "./modules/patientForm/ClassRegistration"
import "../style.css"
import {Header} from "./modules/Header";
import ClassForm from "./modules/loginDialog/ClassForm";

const header= new Header().render()
document.querySelector(".header").append(header)


window.addEventListener("DOMContentLoaded",()=>{
    document.querySelector(".button__item").addEventListener("click",()=>{
        const classForm=new ClassForm().render();
        document.querySelector(".root").append(classForm);
    });
});



