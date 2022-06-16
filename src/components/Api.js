export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-type": "application/json",
      authorization: "e72ccee7-9944-49b7-8571-01f86a4f1251",
    };
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
