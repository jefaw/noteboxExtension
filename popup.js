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
    return `${date.month} ${date.day}, ${date.year}, ${date.hours}:${date.minutes} ${amOrPm}`;
}

function saveText() {
    const userText = textarea.value;
    localStorage.setItem("data", userText);
    localStorage.setItem("date", "Last Saved: "+ setDate())
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
//download txt file
document.querySelector("#link").addEventListener('click', (evt) => {
    const txt = document.querySelector('.notepad').value;
    evt.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(txt);
    evt.target.download = setDate();
});

//gets the currently stored values from the chrome storage . EXAMPLE: updates colours
function restore_options() {
    // Use default value color = 'red'
    chrome.storage.sync.get({
        bgcolor: 'red',
        textareabg: 'red',
    }, function(items) {
        var b = document.body;
        b.style.backgroundColor = items.bgcolor;
        var n = document.querySelector(".notepad");
        console.log(items.textareabg);
        n.style.backgroundColor = items.textareabg;
        if (items.textareabg == "#FFFFFF"){
            n.style.color = "#000000";
        }
        else{
            n.style.color = "#FFFFFF";
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);