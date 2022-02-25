let saveButton = document.querySelector(".save");


saveButton.addEventListener("click", () => {
  console.log("Message Saved");
  alert("This works");
  chrome.storage.local.set({note: saveButton.value}, () => {
    console.log('Saved to db ');
  });

  chrome.storage.local.get(['note'], (result) => {
    saveButton.value = result;
  });
});

console.log("Popup works");
