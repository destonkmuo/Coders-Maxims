const searchResultsContent = document.getElementById('results-content');
const searchButton = document.getElementById('search-button');
var results = [];

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
                    console.log("Results Already Contains User Input... Resetting: "+ results);
                    resetResults();
                    return;
                } else if(modules[modulesIndex].keyTerms.filter(keyTerms => keyTerms.startsWith(input)).length > 0 && input.length > 0){
                    console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`);
                    results.push(modules[modulesIndex].href);
                } else if(input.includes(modules[modulesIndex].name.toLowerCase())){
                    console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`);
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
        console.log("Search Request Complete: " + results);
        resetResults();
}

/*       var timesRun = 0;
        var interval = setInterval(function(){
        timesRun += 1;
        if(timesRun === 60){
            clearInterval(interval);
        }
        var arrOfwords = [["H","e","l","l","o"," ","W","o","r","l","d"]]
        document.getElementById("input-search").placeholder = "";
        }, 2000);
        
        if you're feeling a bit chunky :D

        */