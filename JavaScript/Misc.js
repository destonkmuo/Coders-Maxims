var navVisibilityBar = document.getElementById('nav-visibility-bar');
var philosophicHelper = document.getElementById('philosophic-helper');
var contentDiv = document.getElementById('ph-content');

window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);

    userScrollHeight > 10 ? navVisibilityBar.style.opacity = .90 : navVisibilityBar.style.opacity = 0;
    
    if(userScrollHeight > 50 && localStorage.getItem("isHelperHidden") == "false"){
        philosophicHelper.style.opacity = .85;
        philosophicHelper.style.pointerEvents = "all";
    } else {
        philosophicHelper.style.opacity = 0; 
        philosophicHelper.style.pointerEvents = "none";
        contentDiv.style.opacity = 0;
        contentDiv.style.pointerEvents = "none";
    } 
})
