const BLACK = "#000000";
const WHITE = "#FFFFFF";
const DEFAULT_COLOR = '#5caed6'; // Used to set starting notepad bg

const background = document.querySelector(".background");
const colorPicker = document.querySelector("#colorPicker");
const changeSaved = document.querySelector('#changeSaved');
const darkmode = document.querySelector("#darkmode");
const overlay = document.querySelector(".overlay");

colorPicker.addEventListener("change", setNoteboxColor, false);
darkmode.addEventListener("change", setDarkMode, false);

//Checks boolean isDark and saves "notepadbg" to chrome storage accordingly
function setDarkMode () {
    let isDark = darkmode.checked;
    overlay.style.backgroundColor = isDark? "rgba(0, 0, 0, 0.3)" : "";
    const options = {
        notepadbg: isDark? BLACK : WHITE,
        isdark: isDark
    }
    chrome.storage.sync.set(options, () => {
        changeSaved.textContent = 'Options saved.';
        setTimeout(() => {
            changeSaved.textContent = '';
        }, 1000);
    })   
}

// Saves selected bg color in color picker to chrome storage
function setNoteboxColor(e) {
    chrome.storage.sync.set({noteboxbg: e.target.value}, () => {
        changeSaved.textContent = 'Options saved.';
        setTimeout(function() {
            changeSaved.textContent = '';
        }, 1000);
    });
}

// Sets the options background color and restores darkmode checkbox using chrome sync storage
// Sync storage saves these preferences across chrome accounts
function restore_options() {
    // Sets background color and color picker color to the saved color of the notebox
    chrome.storage.sync.get({noteboxbg: DEFAULT_COLOR}, items => {
        background.style.backgroundColor = items.noteboxbg;
        colorPicker.value = items.noteboxbg;
    });
    // Restores the darkmode checkbox and darkmode overlay
    chrome.storage.sync.get({isdark: false}, items => {
        darkmode.checked = items.isdark;
        overlay.style.backgroundColor = items.isdark? "rgba(0, 0, 0, 0.3)" : "";
    });
}

// Once extension is loaded restore saved options
document.addEventListener('DOMContentLoaded', restore_options);