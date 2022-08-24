const searchResultsContent = document.getElementById('results-content');
const searchButton = document.getElementById('search-button');
var results = [];

function Search() {
    var input = document.getElementById("input-search").value.toLowerCase();
    console.log(input);
    fetch("../Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (results.includes(modules[modulesIndex].url)) {
                    while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
                    console.log("Results Already Contains User Input");
                    results = [];
                    return;
                } else if (modules[modulesIndex].keyTerms.includes(input)) {
                    console.log("Found... Appending Url");
                    results.push(modules[modulesIndex].url);
                }

                if (results.includes(modules[modulesIndex].url)) {
                    var newUrl = document.createElement("a");
                    newUrl.innerHTML = modules[modulesIndex].name;
                    newUrl.href = modules[modulesIndex].url;
                    newUrl.className = "results-lists";
                    document.body.appendChild(newUrl);
                    searchResultsContent.appendChild(newUrl);
                }
            }

            console.log(results);

            function visibility(boolean) {
                if (boolean) {
                    searchResultsContent.style.visibility = "visible";
                    searchResultsContent.style.pointerEvents = "all";
                } else {
                    searchResultsContent.style.visibility = "hidden";
                    searchResultsContent.style.pointerEvents = "none";
                }
            }
            if (results.length > 0) {
                visibility(true)
            } else {
                visibility(false)
            }

            searchButton.onmousedown = function() {
                if (results.length > 0) {
                    visibility(true)
                }
            }
            searchButton.onmouseleave = function() {
                visibility(false)
            }

            //Create a list that you append the top 5 search values to, that are hyper text anchors
        })
}