export default class Fetch {
    static URL = "https://ajax.test-danit.com/api/v2/cards";

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API.token}`
        }
    }

    static async login(userData) {
        const res = await fetch(`${API.URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.text());

        return res.text();
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

    static async getAllCards () {
        const res = await fetch(`${API.URL}/cards`, {
            method: 'GET',
            headers: API.getHeaders(),
        });

        return res.json();
    }

    static async deleteCard (id) {
        const res = await fetch(`${API.URL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${API.token}`
            },
        });

        return res.json();
    }

    static async editCard (newCard) {
        const res = await fetch(`${API.URL}/cards/${id}`, {
            method: 'PUT',
            headers: API.getHeaders(),
            body: JSON.stringify(newCard)
        });

        return res.json();
    }
}
