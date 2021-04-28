
export default class API {
    static URL = "https://ajax.test-danit.com/api/v2/cards";

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API.token}`
        }
    }

    static async login(data) {
        try {
            return fetch(`${API.URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then( (res) => {
                    return res.text()//получаю промис
                })
                .then( (res) => {//получаю уже норм знач
                    return res
                })
        } catch (error) {
            return error
        }

    };

    static saveToken(tokenFromResponse) {
        API.token = tokenFromResponse;
    };

    static async saveCard(cardToSave) {
        const res = await fetch(`${API.URL}/cards`, {
            method: 'POST',
            headers: API.getHeaders(),
            body: JSON.stringify(cardToSave)
        });

        return res.json();


    }
    static async putRequest (object, cardId){
        const response = await fetch(`https://ajax.test-danit.com/api/cards/${cardId}`, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json();
    }

    static async deleteRequest(id) {
        const response = await fetch(`https://ajax.test-danit.com/api/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return true
    }

    static async getRequest() {

        const response = await fetch(`https://ajax.test-danit.com/api/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return await response.json();
    }
}