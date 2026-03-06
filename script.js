const synth = window.speechSynthesis;
const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voice-select');
const speakBtn = document.getElementById('speak');
const stopBtn = document.getElementById('stop');

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
    if (synth.speaking) {
        synth.cancel();
    }

    if (textInput.value !== '') {
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        
        voices.forEach((voice) => {
            if (voice.name === selectedOption) {
                utterance.voice = voice;
            }
        });

        synth.speak(utterance);
    }
}

speakBtn.addEventListener('click', speak);
stopBtn.addEventListener('click', () => synth.cancel());

populateVoiceList();