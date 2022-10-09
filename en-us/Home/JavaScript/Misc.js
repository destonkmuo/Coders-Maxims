var navVisibilityBar = document.getElementById('nav-visibility-bar');

window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);
    if(userScrollHeight > 10) {
        navVisibilityBar.style.opacity = .85;
    } else {
        navVisibilityBar.style.opacity = 0;
    }
    console.log(userScrollHeight);
});

// Nav Visibility 