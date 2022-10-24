window.addEventListener("scroll", (event) => {
    var userScrollHeight = Math.floor(this.scrollY);
    var container = document.getElementById('learn-container');
    var learnImageContainer = document.getElementById('student-img');
    
    var containerPosition = container.offsetTop;

    const learnImageContainerStartPos = 0;
    const learnImageContainerStopPos = containerPosition;

    if(userScrollHeight > learnImageContainerStartPos && userScrollHeight < learnImageContainerStopPos){
        learnImageContainer.style.opacity = `${(userScrollHeight - learnImageContainerStartPos)/(learnImageContainerStopPos - learnImageContainerStartPos)}`; 
        if(window.innerWidth > 1275 && userScrollHeight > 2700){learnImageContainer.style.marginLeft = `${learnImageContainerStartPos - userScrollHeight + 4000}px`} // Flip The Variables to Change where it's coming from
    }

    if(userScrollHeight > 850 && window.innerWidth > 1275) {
        document.getElementById('low-height-page-jumps').style.opacity = "1";
        document.getElementById('low-height-page-jumps').style.pointerEvents = "all";
    } else {
        document.getElementById('low-height-page-jumps').style.opacity = "0";
        document.getElementById('low-height-page-jumps').style.pointerEvents = "none";
    }
    //UserScrollHeight is pass threshold...

})