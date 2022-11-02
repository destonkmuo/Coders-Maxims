var navList = document.getElementsByClassName('nav-list-item');
var button = document.getElementById('low-nav-width-btn');
var dropDown = document.getElementById('drop-down-content');
var windowSubThresh = false;
window.onresize = window.onload = document.onmouseover = function() {
        width = window.innerWidth;
        height = window.innerHeight;
        if (width < 1255) {
            var x;
            width < 500 ? x = 0 : x = 1, navList[0].style.display = "block";
            for (let i = x; i < navList.length - 1; i++) {
                navList[i].style.display = "none";
            }
            button.style.display = "block";
            windowSubThresh = true;
        } else {
            for (let i = 0; i < navList.length - 1; i++) {
                navList[i].style.display = "block";
            }
            button.style.display = "none";
            windowSubThresh = false;
        }
    } 
    button.onclick = function() {
        dropDown.style.visibility = "visible";
        dropDown.style.pointerEvents = "all";
      }

