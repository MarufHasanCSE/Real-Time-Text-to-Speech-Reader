const speakBtn = document.getElementById('speak-btn');
const textInput = document.getElementById('text-input');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');

function speak() {
    if (window.speechSynthesis.speaking) return;

    if (textInput.value !== '') {
        const utterance = new SpeechSynthesisUtterance(textInput.value);
        
        utterance.rate = rateInput.value;
        utterance.pitch = pitchInput.value;

        window.speechSynthesis.speak(utterance);
    }
}

speakBtn.addEventListener('click', speak);