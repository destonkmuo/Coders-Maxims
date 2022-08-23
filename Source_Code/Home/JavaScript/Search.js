const searchResultsContent = document.getElementById('results-content');
const searchButton = document.getElementById('search-button');
var results = [];

function Search() {
    var input = document.getElementById("input-search").value.toLowerCase();
    fetch("../Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let i = 0; i < modules.length; i++) {
                if (results.includes(modules[i].url) && modules[i].keyTerms.includes(input)) { return; } else { 
                    // Guard Clause for Overlapping Urls
                    if (modules[i].keyTerms.includes(input)) {
                        console.log("found... appending url");
                        results.push(modules[i].url);
                    } else { results = []; }
                } 
            }

            
            if (results.length > 0) {
                searchResultsContent.style.visibility = "visible";
                searchResultsContent.style.pointerEvents = "all";
            } else {
                searchResultsContent.style.visibility = "hidden";
                searchResultsContent.style.pointerEvents = "none";
            }
            searchButton.onmousedown = function() {
                console.log("1");
                if (results.length > 0) {
                searchResultsContent.style.visibility = "visible";
                searchResultsContent.style.pointerEvents = "all";
                }
            }
            searchButton.onmouseleave = function() { // Eventually use a class for the list box so it wont pp poo poo
                console.log("2");
                searchResultsContent.style.visibility = "hidden";
                searchResultsContent.style.pointerEvents = "none";
            }
            //Create a list that you append the top 5 search values to, that are hyper text anchors
        })
}