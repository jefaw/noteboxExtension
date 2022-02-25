let textarea = document.querySelector(".main");
let saved = document.querySelector(".saved");

showSavedText();
inactive = 2;
setInterval(displaySavedMessage, 300);

window.addEventListener("keyup", saveText);
window.addEventListener("keydown", keyBeingPressed);


function saveText(){
    let userText = textarea.value;
    localStorage.setItem("data", userText);
    localStorage.setItem()
    inactive = 0;
}

function displaySavedMessage(){
    if (inactive == 3){
        saved.textContent = "Saved note"
        inactive = 0;
    }
    else{
        inactive += 1;
    }

}

function keyBeingPressed(){
    inactive = 0;
    saved.textContent = "..."
}

function showSavedText(){
    textarea.value = localStorage.getItem("data");
}