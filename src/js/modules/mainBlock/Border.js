import doc from "../../../img/white-man-doctor-in-the-medical-interior-of-the-hospital-holds-a-laptop-cartoon-person-3d-rendering_187882-1432.jpg"
import doc2 from "../../../img/male-african-doctor-in-the-medical-interior-of-the-hospital-open-palm-copy-space-cartoon-person_187882-1244.jpg"
import {isTokenInLocalStorage} from "../helper"
import API from "../ApiClass";

export class Border {

    checkCards=async()=>{//to do refactor
        try{
            const cards = await API.getRequest()
            return cards.length===0 && isTokenInLocalStorage()
        }catch (e){

        }
    }


    render(){
        return (
        `
            <div class="border__item">
                <span class="no__cards-item " >
                    ${isTokenInLocalStorage()?"No items have been added":""}
                </span>
                <img class="border__img" src=${!isTokenInLocalStorage()?doc:doc2}>
            </div>
        `

        )
    }

}
