import logo from "../../img/pngwing.com.png"

export  class Header {


    render(){
        return (
            ` <div class="header__section ">
        <img class="logo" src=${logo}>
        <div class="slogan">
            Weill Cornell Internal Medicine Associates by st.Maria
        </div>
        <div class="button">
            <button class="button__item">SIGN IN</button>
        </div>
        </div>`
        )
    }
}