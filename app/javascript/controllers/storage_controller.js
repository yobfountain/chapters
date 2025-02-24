import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="storage"
export default class extends Controller {
  static values = {
    key: String
  }

  connect() {
    let keys = this.returnKeys();
    keys.forEach(key => {
      let el = document.getElementById(key)
      el.value = localStorage.getItem(key);
      const trigger = new CustomEvent("input");
      el.dispatchEvent(trigger);
    })
  }

  storeInput(e) {
    localStorage.setItem(e.target.id, e.target.value);
  }

  reset() {
    if (confirm('Are you sure you want to reset? You will lose all work.')) {
      let keys = this.returnKeys();
      keys.forEach(key => {
        let el = document.getElementById(key)
        el.value = "";
        localStorage.removeItem(key);
        const trigger = new CustomEvent("input");
        el.dispatchEvent(trigger);
      })
    }
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
