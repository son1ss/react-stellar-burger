export default class Api {
  #url

  constructor(url) {
    this.#url = url;
  }

  #parseData(data) {
    return data.json()
  }

  getIngredients() {
    return fetch(`${this.#url}/ingredients`).then(this.#parseData)
  }
}

export const api = new Api('https://norma.nomoreparties.space/api')