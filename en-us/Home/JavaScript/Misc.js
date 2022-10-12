var navVisibilityBar;
var philosophicHelper;

setTimeout(function() {
    navVisibilityBar = document.getElementById('nav-visibility-bar');
    philosophicHelper = document.getElementById('philosophic-helper');
}, 100);

var USERSCROLLHEIGHT;

window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);
    USERSCROLLHEIGHT = userScrollHeight;
    userScrollHeight > 10 ? navVisibilityBar.style.opacity = .85 : navVisibilityBar.style.opacity = 0;
    userScrollHeight > 400 ? philosophicHelper.style.opacity = .85 : philosophicHelper.style.opacity = 0; 
})

var userScrollHeightAtLastInterval;
var interval = setInterval(function(){
userScrollHeightAtLastInterval = USERSCROLLHEIGHT;
if(userScrollHeightAtLastInterval + 25 > USERSCROLLHEIGHT || userScrollHeightAtLastInterval - 25 < USERSCROLLHEIGHT) {
    philosophicHelper.style.opacity = 0;
}}, 5000);