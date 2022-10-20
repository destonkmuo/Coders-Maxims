function Search() {
    var searchResultsContent = document.getElementById('search-results-content');
    var searchButton = document.getElementById('search-button');
    var results = new Set();

    var devLog = false;

    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results = new Set();
    }

    var input = document.getElementById("input-search").value.toLowerCase();

    document.getElementById("input-search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' && input != "") {
            window.location.href = `/en-us/GlobalSearch/?search=${input}`;
        }
    });

    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {

            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (input == " " || results.has(modules[modulesIndex].href)) {
                    if(devLog) { console.error(`Results Contains Space or Already Contains User Input... Resetting: ${results}`) }
                    resetResults();
                } else if(modules[modulesIndex].keyTerms.filter(keyTerms => keyTerms.startsWith(input)).length > 0 && input.length > 0 && results.size < 8){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.add(modules[modulesIndex].href);
                } else if((modules[modulesIndex].name.replace(' ','').toLowerCase().startsWith(input.replace(' ',''))) && input.length > 0 && results.size < 8){
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
                    searchResultsContent.style.opacity = "100%";
                    searchResultsContent.style.pointerEvents = "all";
                } else {
                    searchResultsContent.style.visibility = "hidden";
                    searchResultsContent.style.opacity = "0%";
                    searchResultsContent.style.pointerEvents = "none";
                }
            }

            results.size > 0 ? visibility(true) : visibility(false);
            searchButton.onmousedown = function() { if (results.size > 0) { visibility(true) }}
            searchButton.onmouseleave = function() { visibility(false) }
        })

    if(devLog) { console.log(`Search Request Complete: ${results.values()}`); }
    resetResults();
}