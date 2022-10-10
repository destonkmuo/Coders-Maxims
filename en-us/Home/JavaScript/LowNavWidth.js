var navList;
var button;
var dropDown;
var width, height;


setTimeout(function() {
    navList = document.getElementsByClassName('nav-list-item');
    button = document.getElementById('low-nav-width-btn');
    dropDown = document.getElementsByClassName('low-nav-width-drop-down');

}, 100);

window.onresize = window.onload = document.onmouseover = function() {
    try {
        width = window.innerWidth;
        height = window.innerHeight;
        if (width < 1255) {
            var x;
            if (width < 500) {
                x = 0
            } else {
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
    } catch (error) {}
}

try {
    button.onclick = function() {

        dropDown[0].style.visibility = "visible";
    }
} catch (error) {}