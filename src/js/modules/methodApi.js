import API from "./ApiClass.js";


const handleSubmit = async (e) => {
    const res = await API.login({email:"lar@a.com", password: "1234"});

    API.saveToken(res);

};
