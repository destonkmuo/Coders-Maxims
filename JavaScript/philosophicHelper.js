var contentDiv = document.getElementById('ph-content')
var philosophicHelper = document.getElementById('philosophic-helper');
var phCheckBox = document.getElementById("phCheckBox");
var isHelperToggled = false;
// set this to false
//if localStorage.getItem(isHelperHidden) then some code

function phContent() {
    if(!isHelperToggled && localStorage.getItem("isHelperHidden") == "false") {
        contentDiv.style.pointerEvents = "all";
        contentDiv.style.opacity = 1;
        philosophicHelper.style.opacity = .0;
        isHelperToggled = true;
    } else {
        contentDiv.style.pointerEvents = "none";
        contentDiv.style.opacity = 0;
        philosophicHelper.style.opacity = .85;
        isHelperToggled = false;
    }
}


function closePHContent(){
    contentDiv.style.pointerEvents = "none";
    contentDiv.style.opacity = 0;
    philosophicHelper.style.opacity = .85;
    isHelperToggled = false;
}

function phLS() {
    localStorage.getItem("isHelperHidden") == "false" ? localStorage.setItem("isHelperHidden", true) : localStorage.setItem("isHelperHidden", false);
    
    if(localStorage.getItem("isHelperHidden") == "true") {
    
        philosophicHelper.style.opacity = 0; 
        philosophicHelper.style.pointerEvents = "none";
        contentDiv.style.opacity = 0;
        contentDiv.style.pointerEvents = "none";
    } else {
        philosophicHelper.style.opacity = .85;
        philosophicHelper.style.pointerEvents = "all";

    }
}

window.addEventListener('load', function() {
    if (!sessionStorage.isNewSession) {
        localStorage.setItem("isHelperHidden", false);
    }
    localStorage.getItem("isHelperHidden") == "true" ? phCheckBox.checked = false : phCheckBox.checked = true;
})