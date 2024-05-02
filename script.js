const synth = window.speechSynthesis

// DOM elements
const speechForm = document.getElementById("speech-form")
const textInput = document.getElementById("text-input")
const rate = document.getElementById("rate")
const rateValue = document.getElementById("rate-value")
const pitch = document.getElementById("pitch")
const pitchValue = document.getElementById("pitch-value")
const selectVoice = document.getElementById("select-voice")
const speakBtn = document.getElementById("speak-btn")

let voices = []

// Function to populate the voice select dropdown
function getVoices() {
  voices = synth.getVoices()

  for (const voice of voices) {
    //  Create an option element for each voice
    const option = document.createElement("option")
    option.textContent = `${voice.name} (${voice.lang})`

    // Set data attributes for language and name
    option.setAttribute("data-name", voice.name)
    option.setAttribute("data-lang", voice.lang)

    // Mark the default voice with an additional text
    if (voice.default) {
      option.textContent += " -- DEFAULT"
    }

    selectVoice.appendChild(option)
  }
}

// populate voices on initial load
getVoices()

// Function to handle speech synthesis
function speechSynth(e) {
  e.preventDefault()

  if (textInput.value === "") {
    alert("Please enter some text to synthesize")
    return
  }

  // Create a speechSynthesisUtterance object
  const utterance = new SpeechSynthesisUtterance(textInput.value)

  // Get the selected voice
  const selectedVoice = selectVoice.selectedOptions[0].getAttribute("data-name")

  // Loop through available voices to find the selected one
  for (const voice of voices) {
    if (voice.name === selectedVoice) {
      utterance.voice = voice
    }
  }

  // Set the rate and pitch based on slider values
  utterance.rate = rate.value
  utterance.pitch = pitch.value

  // start speech synthesis
  synth.speak(utterance)

  utterance.onend = () => {
    textInput.value = ""
  }
}

// Functions to update rate and pitch display values
function setRate() {
  rateValue.textContent = rate.value
}
function setPitch() {
  pitchValue.textContent = pitch.value
}

// Event listeners
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices
}
speechForm.addEventListener("submit", speechSynth)
speakBtn.addEventListener("submit", speechSynth)
rate.addEventListener("change", setRate)
pitch.addEventListener("change", setPitch)
