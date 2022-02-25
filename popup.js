let textarea = document.querySelector(".main");
let saved = document.querySelector(".saved");

showSavedText();

window.addEventListener("keyup", saveText);
window.addEventListener("keydown", keyBeingPressed);


function saveText(){
    let userText = textarea.value;
    saved.textContent = "Saved note"
    localStorage.setItem("data", userText);
}

function keyBeingPressed(){
    saved.textContent = "..."
}

function showSavedText(){
    textarea.value = localStorage.getItem("data");
}