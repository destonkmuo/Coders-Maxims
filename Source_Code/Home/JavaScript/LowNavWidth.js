var navList = document.getElementsByClassName('list-ns');
var button = document.getElementById('low-nav-width-btn');
var dropDown = document.getElementsByClassName('low-nav-width-drop-down')
var width, height;

window.onresize = window.onload = function() {    
    width = window.innerWidth;
    height = window.innerHeight;
    if(width < 1225) {
        for (let i = 1; i < navList.length - 1; i++) {
        navList[i].style.display = "none";
        button.style.display = "block";
        }
    } else {
        for (let i = 1; i < navList.length - 1; i++) {
            navList[i].style.display = "block";
            button.style.display = "none";
        }
    }
}

button.onclick = function() {
    dropDown[0].style.visibility = "visible";
}