var darkModeSlider = document.getElementById('dark_mode_slider');
var darkModeButton = document.getElementById('dark_mode_button');
//var btnPrimary = document.getElementsByClassName('btn_primary');
var body = document.body;


var buttonClicked = false;

darkModeButton.onclick = function() {
    if(buttonClicked == false) {
    darkModeButton.style.backgroundColor = "white";
    darkModeButton.style.transition = '1s'
    darkModeSlider.style.backgroundColor = "black";
    darkModeSlider.style.transform = 'translate(0px, 4.5vh)';
    darkModeSlider.style.transition = 'transform .4s ease-in-out'
    body.style.backgroundColor = "black";
    body.style.transition = '1s';
    //btnPrimary[0].style.color = "black";
    buttonClicked = true;
    console.log("chickn");

    }else if(buttonClicked == true) {
    darkModeButton.style.backgroundColor = "black";
    darkModeButton.style.transition = '1s'
    darkModeSlider.style.backgroundColor = "white";
    darkModeSlider.style.transform = 'translate(0px, -2.2px)';
    darkModeSlider.style.transition = 'transform .4s ease-in-out'
    body.style.backgroundColor = "white";
    body.style.transition = '1s';  
    //btnPrimary[0].style.color = "white";

    buttonClicked = false;  
    }
}