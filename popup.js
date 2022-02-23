const saveButton = document.querySelector("save");
saveButton.addEventListener("click", () => {
  chrome.storage.local.set({note: saveButton.value}, function() {
    console.log('Saved to db ' + value);
  });

  chrome.storage.local.get(['note'], function(result) {
    saveButton.value = result;
  });
});

console.log("Popup works");
