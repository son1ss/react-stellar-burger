export default class Api {
  #url

  constructor(url) {
    this.#url = url;
  }

  #request(url, params) {
    return fetch(`${this.#url}${url}`, params).then(this.#parseData)
  }

  #parseData(data) {
    return data.ok ? data.json() : data.json().then(err => Promise.reject(err))
  }

  getIngredients() {
    return this.#request('/ingredients').catch(err => console.log(err))
  }

  createOrder(ingredients) {
    return this.#request('/orders', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(err => console.log(err))
  }
}

export const api = new Api('https://norma.nomoreparties.space/api')