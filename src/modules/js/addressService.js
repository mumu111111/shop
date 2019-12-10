import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Address {

  static list() {
    return fetch(url.addressList)
  }

  static add(data) {
    return fetch('POST', url.addAddress, data)
  }

  static remove(id) {
    return fetch('POST', url.removeAddress, id)
  }

  static update(data) {
    return fetch('POST', url.updateAddress, data)
  }

  static setDefault(id) {
    return fetch('POST', url.setDefault, id)
  }
}

export default Address