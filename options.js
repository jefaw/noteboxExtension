var bgcolour;
var
    defaultColour = "#0000ff";
window.addEventListener("load", startup, false);

function startup() {
    bgcolour = document.querySelector("#bgcolour");
    bgcolour.value = defaultColour;
    bgcolour.addEventListener("input", updateFirst, false);
    bgcolour.addEventListener("change", updateAll, false);
    bgcolour.select();
}

function updateFirst(event) {
    var p = document.querySelector("p");

    if (p) {
        p.style.color = event.target.value;
    }
}
//saves selected background to chrome storage
function updateAll(event) {
    chrome.storage.sync.set({
        bgcolor: event.target.value,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 50);
    });
    //changes p colour just for testing
    document.querySelectorAll("p").forEach(function(p) {
        p.style.color = event.target.value;
    });
}
// from example if you search chrome options page on google
/* Saves options to chrome.storage
function save_options() {
    var color = document.getElementById('color').value;
    chrome.storage.sync.set({
        favoriteColor: color,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

*/
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red'
    chrome.storage.sync.get({
        bgcolor: 'red',
    }, function(items) {
        var p = document.querySelector("p");
        p.style.color = items.bgcolor;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
//document.getElementById('save').addEventListener('click',
//save_options);