var navVisibilityBar;

setTimeout(function() {
    navVisibilityBar = document.getElementById('nav-visibility-bar');
}, 100);

window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);
    userScrollHeight > 10 ? navVisibilityBar.style.opacity = .85 : navVisibilityBar.style.opacity = 0;
});

// Nav Visibility 