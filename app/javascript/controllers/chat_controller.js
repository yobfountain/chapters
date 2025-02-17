import { Controller } from "@hotwired/stimulus"
import { CreateMLCEngine } from "@mlc-ai/web-llm"

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["prompt", "response", "status", "progress"]

  modelId = "Llama-3.2-3B-Instruct-q4f16_1-MLC"
  llmEngine = null
  connect() {
    this.initializeLLM()
  }

  async initializeLLM() {
    try {
      this.llmEngine = await CreateMLCEngine(this.modelId, {
        initProgressCallback: this.initProgressCallback.bind(this)
      })
    } catch (error) {
      this.statusTarget.textContent = error
    }
  }

  initProgressCallback(initProgress) {
    // Potential meesages below: 
    // Initializing LLM Engine: Loading model from cache[41/58]: 0MB loaded. 0% completed, 0 secs elapsed.
    // Initializing LLM Engine: Fetching param cache[16/58]: 626MB fetched. 36% completed, 12 secs elapsed. It can take a while when we first visit this page to populate the cache. Later refreshes will become faster.
    // Initializing LLM Engine: Finish loading on <<WebGPU - apple>>
    if (initProgress.text.indexOf("Finish loading") > -1) {
      this.statusTarget.remove()
    } else {
      let regex = /\[.*\]/i;
      let progress = regex.exec(initProgress.text);
      if (progress) {
        let percentComponents = progress[0].slice(1, -1).split("/");
        let percentage = Math.floor((parseInt(percentComponents[0]) / parseInt(percentComponents[1])) * 100)
        this.progressTarget.style.width = `${percentage}%`;
      }
    }
  }

  returnKeys() {
    let keys = [];
    let elements = document.getElementsByTagName("textarea");
    for (let item of elements) {
      key_names.push(item.id)
    }
    return keys
  }

  generateChapter(event) {
    let elementId = event.currentTarget.dataset.chapterTarget;
    let generateButtonIcon = document.getElementById(`generate_${elementId}`).firstChild;
    generateButtonIcon.classList.add("loading");
    let chapterElement = document.getElementById(elementId);
    let placeholder = chapterElement.placeholder
    let outline = ["I need help writing an outline for a novel. Here's what I have so far:"];
    let coda = `Please write a couple sentences for the next part of the outline. Here's what should happen next: ${placeholder}. Only respond with the two next sentences. Don't include an intro portion in your response.`
    let elements = document.getElementsByTagName("textarea");
    for (let item of elements) {
      if (item && item.value.length > 0) {
        outline.push(item.value)
      }
    }
    outline.push(coda);
    outline = outline.join("\n");
    // console.log(outline)
    const messages = [
      { role: "system", content: "You are a helpful writing assistant." },
      { role: "user", content: outline }
    ]
    setTimeout(this.streamResponse(elementId, messages), 100);
  }

  async streamResponse(elementId, messages) {
    if (!this.llmEngine) { alert("LLM Engine is not initialized yet."); return }
    let chapterElement = document.getElementById(elementId);
    let generateButtonIcon = document.getElementById(`generate_${elementId}`).firstChild;
    try {
      const chunks = await this.llmEngine.chat.completions.create({
        messages,
        temperature: 0.9,
        stream: true,
        stream_options: { include_usage: true }
      })
      let reply = ""
      for await (const chunk of chunks) {
        if (chunk.choices[0]?.finish_reason == "stop") {
          generateButtonIcon = document.getElementById(`generate_${elementId}`).firstChild;
          generateButtonIcon.classList.remove("loading");
        }
        reply += chunk.choices[0]?.delta.content || ""
        localStorage.setItem(elementId, reply);
        // console.log(chunk);
        chapterElement.value = reply
        const trigger = new CustomEvent("input");
        chapterElement.dispatchEvent(trigger);
        if (chunk.usage) {
          // console.log(chunk.usage)
        }
      }
    } catch (error) {
      chapterElement.value = error
      localStorage.removeItem(elementId);
    }
  }

  async generatePrompt(event) {
    event.preventDefault()
    const messages = [
      { role: "system", content: "You are a helpful writing assistant." },
      { role: "user", content: "Create a short prompt for a novel that is 35 words or less. Only include the summary, no other text." }
    ]
    if (!this.llmEngine) { alert("LLM Engine is not initialized yet."); return }

    try {
      const chunks = await this.llmEngine.chat.completions.create({
        messages,
        temperature: 0.9,
        stream: true,
        stream_options: { include_usage: true }
      })

      let reply = ""
      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta.content || ""
        localStorage.setItem("story_prompt", reply);
        this.promptTarget.value = reply
        if (chunk.usage) {
          // console.log(chunk.usage)
        }
      }
    } catch (error) {
      this.statusTarget.textContent = error
    }
  }

  updateElement(elementId, text) {
    document.getElementById(elementId).value = text;
  }
}