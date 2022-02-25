
const textarea = document.querySelector(".main");
const saved = document.querySelector(".saved");
let timer;

getSavedText();

window.addEventListener("keyup", saveText);
window.addEventListener("keydown", keyBeingPressed);

function saveText(){
    localStorage.setItem("data", textarea.value);

    clearTimeout(timer)
    timer = setTimeout(displaySaveText, 800);
}

function keyBeingPressed(){
    saved.textContent = "..."
}

function getSavedText(){
    textarea.value = localStorage.getItem("data");
}

function displaySaveText(){
    saved.textContent = "Saved note";
}
