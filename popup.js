const textarea = document.querySelector(".notepad");
const saved = document.querySelector(".savedText");
let displayMessage = false;
let timer;

getSavedText();
getLastSavedDate();

window.addEventListener("keyup", saveText);
window.addEventListener("keydown", keyBeingPressed);


function setDate() {
    let date = new Date();
    const monthArray = [
        "January", "Febuary", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    let hours24 = date.getHours();
    // Converts 24 hour time to 12 hour time
    let hours = (hours24 % 12) || 12;
    const amOrPm = hours24 >= 12 ? 'pm' : 'am';

    date = {
        year: 1900 + date.getYear(),
        month: monthArray[date.getMonth()],
        day: date.getDate(),
        hours: hours,
        minutes: date.getMinutes(),
        amOrPm: amOrPm
    }
    return `Last Saved: ${date.month} ${date.day}, ${date.year}, ${date.hours}:${date.minutes} ${amOrPm}`;
}

function saveText() {
    const userText = textarea.value;
    localStorage.setItem("data", userText);
    localStorage.setItem("date", setDate())
    clearTimeout(timer)
    timer = setTimeout(displaySaveText, 550);
}

function keyBeingPressed() {
    keydown = true;
    saved.textContent = "..."
}

function getSavedText() {
    textarea.value = localStorage.getItem("data");
}

function getLastSavedDate() {
    saved.textContent = localStorage.getItem("date");
}

function displaySaveText() {
    saved.textContent = "Saved note";
}
//go to options page on button click
document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

function restore_options() {
    // Use default value color = 'red'
    chrome.storage.sync.get({
        bgcolor: 'red',
    }, function(items) {
        var b = document.body;
        b.style.backgroundColor = items.bgcolor;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);