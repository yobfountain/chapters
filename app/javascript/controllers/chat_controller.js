import { Controller } from "@hotwired/stimulus"
import { CreateMLCEngine } from "@mlc-ai/web-llm"

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["prompt", "response", "status"]

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
    this.statusTarget.textContent = `Initializing LLM Engine: ${initProgress.text}`
  }

  async submit(event) {
    event.preventDefault()
    const prompt = this.promptTarget.value.trim()
    const messages = [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: prompt },
    ]

    if (!prompt) { alert("Please enter a prompt."); return }
    if (!this.llmEngine) { alert("LLM Engine is not initialized yet."); return }

    // try {
    //   const reply = await this.llmEngine.chat.completions.create({
    //     messages,
    //       temperature: 0.9
    //   })
    //   this.responseTarget.textContent = reply.choices[0].message.content
    // } catch (error) {
    //   this.statusTarget.textContent = error
    // }

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
        this.responseTarget.textContent = reply

        if (chunk.usage) {
          console.log(chunk.usage)
        }
      }
    } catch (error) {
      this.statusTarget.textContent = error
    }
  }
}