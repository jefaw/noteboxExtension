import {getDate, getTime} from "./helpers.js";

function saveText() {
    const notes = notepad.value;
    const lastSaved = `Last saved note on ${getDate()}`;
    localStorage.setItem("notes", notes);
    localStorage.setItem("lastSaved", lastSaved);
    // Saved note message will appear if it has been longer than 550ms without typing
    clearTimeout(timer)
    timer = setTimeout(() => saved.textContent = `Saved note at ${getTime()}`, 550); 
}

let timer; // Used to make 'Saved note' message appear after 550ms
const notebox = document.querySelector(".notebox");
const notepad = document.querySelector(".notepad");
const saved = document.querySelector(".saved-text"); // Saved text message
const optionsButton = document.querySelector(".options"); // Options button
const startingColor = "#5caed6"; // Used to set starting notepad bg

notepad.value = localStorage.getItem("notes"); // Set notepad txt from local storage
saved.textContent = localStorage.getItem("lastSaved"); // Set last saved txt from local storage

// Typing Event Listeners
window.addEventListener("keyup", saveText); // Save the notes once typed a char
window.addEventListener("keydown", () => saved.textContent = "..."); // When typing a char display a ... message

// Button sends user to the options page
optionsButton.addEventListener("click", () => { 
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

// Button downloads notes into a txt file
document.querySelector(".download-link").addEventListener("click", (evt) => {
    const txt = document.querySelector('.notepad').value;
    console.log(txt);
    evt.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(txt);
    evt.target.download = getDate();
});

// Gets the currently stored values from the chrome storage . EXAMPLE: updates colours
function restore_options() {
    // Use default value color = 'red'
    chrome.storage.sync.get({
        bgcolor: startingColor, // Notebox starting bg color
        notepadbg: '#FFFFFF', // Notepad starting bg color
    }, function(items) {
        notebox.style.backgroundColor = items.bgcolor;
        var n = document.querySelector(".notepad");
        console.log(items.notepadbg);
        n.style.backgroundColor = items.notepadbg;
        if (items.notepadbg == "#FFFFFF"){
            n.style.color = "#000000";
        }
        else{
            n.style.color = "#FFFFFF";
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);