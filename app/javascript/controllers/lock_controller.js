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

  lockChapter(e) {
    e.preventDefault();
    let chapter_id = this.element.dataset.chapterTarget;
    let chapterEl = document.getElementById(chapter_id);
    this.element.style.display = "none";
    document.getElementById(`generate_${chapter_id}`).style.display = "none";
    document.getElementById(`lock_${chapter_id}`).style.display = "initial";
    chapterEl.classList = "w-full outline-none text-sm font-light resize-none";
    if (chapter_id == "story_prompt") {
      chapterEl.className = "w-full p-4 outline-none text-sm font-light resize-none rounded-xl border-2 border-purple-200 outline-none shadow-sm bg-white"
    }
    chapterEl.disabled = true;
  }

  unlockChapter(e) {
    e.preventDefault();
    let chapter_id = this.element.dataset.chapterTarget;
    let chapterEl = document.getElementById(chapter_id);
    this.element.style.display = "none";
    document.getElementById(`generate_${chapter_id}`).style.display = "initial"
    document.getElementById(`unlock_${chapter_id}`).style.display = "initial"
    chapterEl.className = "w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 outline-none text-sm font-light";
    if (chapter_id == "story_prompt") {
      chapterEl.className = "flex-1 p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 text-sm outline-none shadow-sm bg-white"
    }
    chapterEl.disabled = false;
  }
}
