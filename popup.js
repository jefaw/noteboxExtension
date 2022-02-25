const textarea = document.querySelector(".main");
const saved = document.querySelector(".saved");
let displayMessage = false;
let timer;

getSavedText();
setDate()

window.addEventListener("keyup", saveText);
window.addEventListener("keydown", keyBeingPressed);

function setDate(){
  let date = new Date();
  monthArray = [
    "January", "Febuary", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  date = {
    year: 1900 + date.getYear(),
    month: monthArray[date.getMonth()],
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
  saved.textContent = `Last Saved: ${date.month} ${date.day}, ${date.year}:${date.hours}:${date.minutes}:${date.seconds}`;

}

function saveText(){
  const userText = textarea.value;
  localStorage.setItem("data", userText);
  clearTimeout(timer)
  timer = setTimeout(displaySaveText, 550);
}

function keyBeingPressed(){
    keydown = true;
    saved.textContent = "..."
}

function getSavedText(){
    textarea.value = localStorage.getItem("data");
}

function displaySaveText(){
  saved.textContent = "Saved note";
}
