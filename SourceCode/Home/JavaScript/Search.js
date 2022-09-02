const searchResultsContent = document.getElementById('results-content');
const searchButton = document.getElementById('search-button');
var results = [];

var devLog = false;

function resetResults() {
    while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
    results = [];
}

function Search() {
    var input = document.getElementById("input-search").value.toLowerCase();
    fetch("../Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (results.includes(modules[modulesIndex].href)) {
                    if(devLog) { console.error(`Results Already Contains User Input... Resetting: ${results}`) }
                    resetResults();
                    return;
                } else if(modules[modulesIndex].keyTerms.filter(keyTerms => keyTerms.startsWith(input)).length > 0 && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.push(modules[modulesIndex].href);
                } else if((modules[modulesIndex].name.replace(' ','').toLowerCase().startsWith(input.replace(' ',''))) && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.push(modules[modulesIndex].href);
                }
                
                if (results.includes(modules[modulesIndex].href)) {
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

            if (results.length > 0) { visibility(true) } else { visibility(false) }
            searchButton.onmousedown = function() { if (results.length > 0) { visibility(true) }}
            searchButton.onmouseleave = function() { visibility(false) }
        })
    if(devLog) { console.log(`Search Request Complete: ${results}`); }
    resetResults();
}


/*document.addEventListener("DOMContentLoaded", function(event) { 
var time = 0;
var currentString = [];
var timeSpeed = 400;
var arrOfwords = [["H","e","l","l","o"," ","W","o","r","l","d"],[""]]
var increment = true;

var interval = setInterval(function(){
    if(time == arrOfwords[0].length && increment == true){
        increment = false;
        console.log(increment);
        time = 1;
        timeSpeed = 200;
        currentString.pop();
        document.getElementById("input-search").placeholder = `Search... ${currentString.join("")}`;
        if(currentString.length == 0) {
            console.log(currentString.length);
            increment = true;
        }
    }
    currentString.push(arrOfwords[0][time]);
    document.getElementById("input-search").placeholder = `Search... ${currentString.join("")}`;
    time += 1;
}, timeSpeed);
})
*/
        