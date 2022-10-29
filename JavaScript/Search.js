function Search() {
    const searchResultsContent = document.getElementById('search-results-content');
    const searchButton = document.getElementById('search-button');
    const devLog = false;

    var input = document.getElementById("input-search").value.toLowerCase();
    var results = new Set();

    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results.clear();
    }

    document.getElementById("input-search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' && input != "") {
            window.location.href = `/s_dir/GlobalSearch/?search=${input}`;
        }
    });

    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {

            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                
                function instantiateResult() {
                    var searchResult = document.createElement("a");
                    searchResult.innerHTML = `🔍︎ ${modules[modulesIndex].name}`;
                    searchResult.href = modules[modulesIndex].href;
                    searchResult.className = "results-lists";
                    document.body.appendChild(searchResult);
                    searchResultsContent.appendChild(searchResult);
                }

                if (results.has(modules[modulesIndex].href || input == "")) {
                    if(devLog) console.error(`Results Contains Space or Already Contains User Input... Resetting: ${results}`) 
                }  else if((modules[modulesIndex].name.toLowerCase().includes(input)) && input.length > 0 && results.size < 6 && !results.has(modules[modulesIndex].href)){
                    if(devLog) console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) 
                    results.add(modules[modulesIndex].href);
                    instantiateResult();
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
    resetResults();
}