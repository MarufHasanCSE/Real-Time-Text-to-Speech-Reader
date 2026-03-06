const synth = window.speechSynthesis;
const speakBtn = document.getElementById('speak');
const resetBtn = document.getElementById('reset');
const textInput = document.getElementById('text');
const statusDisplay = document.getElementById('status');

function updateStatus(msg) {
    statusDisplay.textContent = msg;
    console.log("Speech Status:", msg);
}

function forceReset() {
    synth.cancel();
    updateStatus("Engine Reset");
}

function speak() {
    if (synth.paused) {
        synth.resume();
    }
    
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(textInput.value);

    utterance.onstart = () => updateStatus("Speaking...");
    utterance.onend = () => updateStatus("Finished");
    utterance.onerror = (e) => updateStatus("Error: " + e.error);

    setTimeout(() => {
        synth.speak(utterance);
    }, 100);
}

speakBtn.addEventListener('click', speak);
resetBtn.addEventListener('click', forceReset);

window.addEventListener('load', () => {
    if ('speechSynthesis' in window) {
        updateStatus("API Supported");
    } else {
        updateStatus("Not Supported");
    }
});