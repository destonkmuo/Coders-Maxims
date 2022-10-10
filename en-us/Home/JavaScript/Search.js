function Search() {
    var searchResultsContent = document.getElementById('results-content');
    var searchButton = document.getElementById('search-button');
    var results = new Set();

    var devLog = false;

    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results = new Set();
    }

    var input = document.getElementById("input-search").value.toLowerCase();
    fetch("../Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (input == " " || results.has(modules[modulesIndex].href)) {
                    if(devLog) { console.error(`Results Already Contains User Input... Resetting: ${results}, Or Space Is The Only Input`) }
                    resetResults();
                    return;
                } else if(modules[modulesIndex].keyTerms.filter(keyTerms => keyTerms.startsWith(input)).length > 0 && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.add(modules[modulesIndex].href);
                } else if((modules[modulesIndex].name.replace(' ','').toLowerCase().startsWith(input.replace(' ',''))) && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.add(modules[modulesIndex].href);
                }
                
                if (results.has(modules[modulesIndex].href)) {
                    var searchResult = document.createElement("a");
                    searchResult.innerHTML = modules[modulesIndex].name;
                    searchResult.href = modules[modulesIndex].href;
                    searchResult.className = "results-lists";
                    document.body.appendChild(searchResult);
                    searchResultsContent.appendChild(searchResult);
                }
            }

            function visibility(boolean) {
                if (boolean) {
                    searchResultsContent.style.visibility = "visible";
                    searchResultsContent.style.pointerEvents = "all";
                } else {
                    searchResultsContent.style.visibility = "hidden";
                    searchResultsContent.style.pointerEvents = "none";
                }
            }

            if (results.size > 0) { visibility(true) } else { visibility(false) }
            searchButton.onmousedown = function() { if (results.size > 0) { visibility(true) }}
            searchButton.onmouseleave = function() { visibility(false) }
        })

    if(devLog) { console.log(`Search Request Complete: ${results.values()}`); }
    resetResults();
}

/*
document.addEventListener("DOMContentLoaded", function(event) { 
var time = 0;
var currentString = [];
var timeSpeed = 350;
var x = 0;
var arrOfWords = [["H","e","l","l","o"," ","W","o","r","l","d"],["F","o","r"," ","L","o","o","p"]];

var interval = setInterval(function(){
    document.getElementById("input-search").placeholder = `Search... ${currentString.join("")}`;

    if(x != arrOfWords.length && time == arrOfWords[x].length) {
        currentString.pop();
    }
    if(time != arrOfWords[x].length) {
        currentString.push(arrOfWords[x][time]);
        time += 1;
    } else if(x + 1 == arrOfWords.length) {
        x = 0;
    } else if(currentString.length == 0) {
        time = 0;
        x += 1;
    } 

}, timeSpeed);
})
*/