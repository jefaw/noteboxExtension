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
const downloadButton = document.querySelector(".download-link");
const DEFAULT_COLOR = "#5caed6"; // Used to set starting notepad bg
const BLACK = "#000000";
const WHITE = "#FFFFFF";

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
downloadButton.addEventListener("click", (evt) => {
    const txt = document.querySelector('.notepad').value;
    console.log(txt);
    evt.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(txt);
    evt.target.download = getDate();
});

// Gets the currently stored values from the chrome storage
function restore_options() {
    const getbg = {
        noteboxbg: DEFAULT_COLOR, // Notebox starting bg color
        notepadbg: WHITE // Notepad starting bg color
    }
    chrome.storage.sync.get(getbg, bg => {
        notebox.style.backgroundColor = bg.noteboxbg;
        notepad.style.backgroundColor = bg.notepadbg;
        // Change text color to white if in darkmode
        if (bg.notepadbg === BLACK) {
            notepad.style.color = WHITE;
        }
    });
}

// Once extension is loaded restore saved options
document.addEventListener('DOMContentLoaded', restore_options);