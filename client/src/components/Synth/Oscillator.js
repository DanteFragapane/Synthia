const audioContext = window.audioContext || new AudioContext()
const makeSound = (waveform, frequency, duration) => {
    var oscillator = audioContext.createOscillator()
    oscillator.type = waveform || "sine"
    oscillator.frequency.value = frequency || 300

    oscillator.start()
    duration = duration || 500
    window.setTimeout(oscillator.stop.bind(oscillator), duration)
}

export default makeSound