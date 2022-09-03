var navList = document.getElementsByClassName('nav-list-item');
var button = document.getElementById('low-nav-width-btn');
var dropDown = document.getElementsByClassName('low-nav-width-drop-down');
var searchBar = document.getElementById('input-search');
var width, height;

window.onresize = window.onload = function() {    
    width = window.innerWidth;
    height = window.innerHeight;
    if(width < 1255) {
        var x;
        if(width < 500) { x = 0 } else { 
            x = 1;
            navList[0].style.display = "block";
        }
        for (let i = x; i < navList.length - 1; i++) {
        navList[i].style.display = "none";
        button.style.display = "block";
        }
    } else {
        for (let i = 0; i < navList.length - 1; i++) {
            navList[i].style.display = "block";
            button.style.display = "none";
        }
    }
}

button.onclick = function() {
    dropDown[0].style.visibility = "visible";
}