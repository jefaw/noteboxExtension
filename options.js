var bgcolour;
var toggledark;
var isDark;

console.log("isDark = ", isDark );
document.querySelector("#darkMode").checked = isDark;
            
var defaultColour = "#000000";
window.addEventListener("load", startup, false);

function startup() {
    bgcolour = document.querySelector("#bgcolour");
    bgcolour.value = defaultColour;
    bgcolour.addEventListener("input", updateFirst, false);
    bgcolour.addEventListener("change", updateAll, false);
    bgcolour.select();

    toggledark = document.querySelector("#darkMode");
    // toggledark.checked = isDark;
    toggledark.addEventListener("change", dark, false);
}   

//Checks boolean isDark and saves "textareabg" to chrome storage accordingly
function dark(){
    
    console.log(document.body.style.backgroundColor);
    isDark = toggledark.checked;
    // isDark = !isDark;
    if (isDark){
        chrome.storage.sync.set({
            textareabg: '#000000',
            isdark: true, 
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 1000);
        });
    }
    else{
        chrome.storage.sync.set({
            textareabg: '#FFFFFF',
            isdark: false,
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 1000);
        });
    }
    
}

function updateFirst(event) {
    var p = document.querySelector("p");

    if (p) {
        p.style.color = event.target.value;
    }
}
//saves selected background colour to chrome storage
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

// Restores select box and checkbox state using the preferences stored in chrome.storage
// Dynamically updates the options background depending on the selected notebox background
function restore_options() {
    // Use default value color = 'red'
    chrome.storage.sync.get({
        bgcolor: 'red',
    }, function(items) {
        var p = document.querySelector("body");
        p.style.backgroundColor = items.bgcolor;
    });

    chrome.storage.sync.get({
        isdark: false,
    }, function(items) {
        isDark = items.isdark;
        document.querySelector("#darkMode").checked = isDark;
    });
    
    chrome.storage.sync.get({
        bgcolor: '#123123',
    }, function(items) {
        const colorPicker = document.querySelector("#bgcolour");
        colorPicker.value = items.bgcolor;
    });
}


document.addEventListener('DOMContentLoaded', restore_options);
//document.getElementById('save').addEventListener('click',save_options);