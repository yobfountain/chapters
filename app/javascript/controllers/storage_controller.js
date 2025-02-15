import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="storage"
export default class extends Controller {
  static values = {
    key: String
  }

  connect() {
    let keys = this.returnKeys();
    keys.forEach(key => {
      document.getElementById(key).value = localStorage.getItem(key);
    })
  }

  storeInput(e) {
    localStorage.setItem(e.target.id, e.target.value);
  }

  returnKeys() {
    let keys = [];
    let elements = document.getElementsByTagName("textarea");
    for (let item of elements) {
      keys.push(item.id)
    }
    return keys
  }
}
