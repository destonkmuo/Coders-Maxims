var navList = document.getElementsByClassName('list_ns');

var width, height;

window.onresize = window.onload = function() {    
    width = window.innerWidth;
    height = window.innerHeight;
    if(width < 1225) {
        for (let i = 1; i < navList.length - 1; i++) {
        navList[i].style.display = "none";
        }
    } else {
        for (let i = 1; i < navList.length - 1; i++) {
            navList[i].style.display = "block";
        }
    }
}

