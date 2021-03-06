import API from '../ApiClass.js';

export class CreateVisit extends API {
  constructor() {
    super();
    this.url = 'https://ajax.test-danit.com/api/cards';
    this.token = localStorage.getItem('token');
  }

  getObj(id) {
    const collection = document.getElementsByClassName(id);

    const obj = {};

    for (const item of collection) {
      obj[item.name] = item.value;
    }
    return obj;
  }

  async formSubmit(obj) {
    console.log(obj);
    return await CreateVisit.postRequest(obj, this.url, this.token);
  }

  clearInputs(id) {
    let element = document.getElementById(id);

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
