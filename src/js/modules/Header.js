import logo from "../../img/pngwing.com.png"
import Form from "./loginDialog/ClassForm";

export  class Header extends Form{
    constructor() {
        super();
        this.elements={
            parent:this.createElement("div",{className:"header__section "}),
            image:this.createElement("img",{className: "logo",src:logo}),
            slogan:this.createElement("div",{className:"slogan"}),
            buttonWrapper:this.createElement("div",{className:"button"}),
            button:this.createElement("button",{className:"button__item"}),
        }

    }

    setModalDialog=()=>{

    }

    render(){
        const {parent,image,slogan,buttonWrapper,button}=this.elements
        button.addEventListener("click",this.setModalDialog)

        buttonWrapper.append(button)
        slogan.textContent=`Weill Cornell Internal Medicine Associates by st.Maria`
        button.textContent=`SIGN IN`
        parent.append(image,slogan,buttonWrapper)
        return parent

    }
}