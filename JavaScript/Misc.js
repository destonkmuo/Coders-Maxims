var navVisibilityBar = document.getElementById('nav-visibility-bar');
var philosophicHelper = document.getElementById('philosophic-helper');

var USERSCROLLHEIGHT;

window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);
    USERSCROLLHEIGHT = userScrollHeight;
    userScrollHeight > 10 ? navVisibilityBar.style.opacity = .90 : navVisibilityBar.style.opacity = 0;
    userScrollHeight > 400 ? philosophicHelper.style.opacity = .85 : philosophicHelper.style.opacity = 0; 
})

var userScrollHeightAtLastInterval;
var interval = setInterval(function(){
userScrollHeightAtLastInterval = USERSCROLLHEIGHT;
if(userScrollHeightAtLastInterval == USERSCROLLHEIGHT) {
    philosophicHelper.style.opacity = 0;
    interval = 1;
}
}, 5000);