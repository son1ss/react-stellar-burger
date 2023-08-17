export default class Api {
  #url

  constructor(url) {
    this.#url = url;
  }

  #parseData(data) {
    return data.ok ? data.json() : data.json().then(err => Promise.reject(err))
  }

  getIngredients() {
    return fetch(`${this.#url}/ingredients`).then(this.#parseData).catch(err => console.log(err))
  }
}

export const api = new Api('https://norma.nomoreparties.space/api')