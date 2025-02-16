import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="ui-controls"
export default class extends Controller {
  connect() {
  }

  download(event) {
    event.preventDefault();
    console.log("hello")
    var element = document.createElement('a');
    let outline = [];
    let elements = document.getElementsByTagName("textarea");
    for (let item of elements) {
      if (item && item.value.length > 0) {
        outline.push(item.value)
      }
    }
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outline.join("\n\n")));
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}_${month}_${day}`;
    element.setAttribute('download', `novel_outline_${formattedDate}`);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  lockChapter() {
    let chapter_id = this.element.dataset.chapterTarget;
    let chapterEl = document.getElementById(chapter_id);
    this.element.style.display = "none";
    document.getElementById(`generate_${chapter_id}`).style.display = "none";
    document.getElementById(`lock_${chapter_id}`).style.display = "initial";
    let div = document.createElement("div");
    div.id = chapter_id;
    div.innerText = chapterEl.value;
    div.className = "text-sm font-light";
    chapterEl.replaceWith(div);
  }

  unlockChapter() {
    let chapter_id = this.element.dataset.chapterTarget;
    let chapterEl = document.getElementById(chapter_id);
    this.element.style.display = "none";
    document.getElementById(`generate_${chapter_id}`).style.display = "initial"
    document.getElementById(`unlock_${chapter_id}`).style.display = "initial"
    let textarea = document.createElement("textarea");
    let placeholders = JSON.parse(localStorage.getItem("placeholders"))
    textarea.id = chapter_id;
    textarea.placeholder = placeholders[chapter_id];
    textarea.value = chapterEl.innerText;
    textarea.className = "w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none text-sm font-light";
    textarea.setAttribute("data-controller", "autogrow");
    textarea.setAttribute("data-action", "input->storage#storeInput input->autogrow#resize");
    chapterEl.replaceWith(textarea);
  }
}
