//сюда мы будем импортировать все
//import {VisitForm} from "./modules/patientForm/ClassRegistration"
import "../style.css"
import {Header} from "./modules/Header";
import ClassForm from "./modules/loginDialog/ClassForm";
import {Border} from "./modules/mainBlock/Border.js";
import {isTokenInLocalStorage} from "./modules/helper";
import {Cards} from "./modules/ClassCard";
import API from "./modules/ApiClass";



const isRenderWithToken=()=>{
    const isToken=isTokenInLocalStorage()
    const header= new Header(isToken).render()
    document.querySelector(".header").append(header)
}
isRenderWithToken();


// document.querySelector(".main__border").insertAdjacentHTML("afterend",new Border().render())

//  tarasAddBagFilter
// (async () => {
//     await new Cards().addAllCards();
// })();


