import logo from "../../img/pngwing.com.png"
import Form from "./loginDialog/ClassForm";
import ClassForm from "./loginDialog/ClassForm";
import  {isTokenInLocalStorage} from "./helper.js";

export  class Header extends Form{
    constructor(isToken) {
        super();
        this.isToken=isToken;
        this.elements={
            parent:this.createElement("div",{className:"header__section "}),
            image:this.createElement("img",{className: "logo",src:logo}),
            slogan:this.createElement("div",{className:"slogan"}),
            buttonWrapper:this.createElement("div",{className:"button"}),
            button:this.createElement("button",{className:"button__item"}),
        }

    }

    setModalDialog= async ()=>{
        const isToken = isTokenInLocalStorage();
        if (!isToken){
            const classForm=new ClassForm().render();
            document.querySelector(".root").append(classForm);
        } else{
            //лара впиши сюда свою форму
        }

    }
    //если перезагружать страницу надо удалить токен и еще раз перезагрузить страницу
    //TO DO init app

    render(){
        const {parent,image,slogan,buttonWrapper,button}=this.elements
        button.addEventListener("click",this.setModalDialog)

        buttonWrapper.append(button)
        slogan.textContent=`Weill Cornell Internal Medicine Associates by st.Maria`
        button.textContent=!this.isToken?`SIGN IN`:"CREATE VISIT"
        parent.append(image,slogan,buttonWrapper)
        return parent

    }
}