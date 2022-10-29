function Search() {
    const searchResultsContent = document.getElementById('search-results-content');
    const searchButton = document.getElementById('search-button');
    const devLog = true;

    var input = document.getElementById("input-search").value.toLowerCase();
    var results = [];

    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results = [];
    }

    document.getElementById("input-search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' && input != " ") {
            window.location.href = `/s_dir/GlobalSearch/?search=${input}`;
        }
    });

    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {

            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (results.includes(modules[modulesIndex].href || input == " ")) {
                    if(devLog) console.error(`Results Contains Space or Already Contains User Input... Resetting: ${results}`);
                    resetResults();
                }  else if((modules[modulesIndex].name.toLowerCase().includes(input)) && input.length > 0 && results.size < 6) {
                    if(devLog) console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`);
                    results.push([modules[modulesIndex].href, modules[modulesIndex].name]);
                }
            }
            
            for(let i = 0; i < results.size; i++) {
                var searchResult = document.createElement("a");
                searchResult.innerHTML = `🔍︎ ${results[i][1]}`;
                searchResult.href = results[i][0];
                searchResult.className = "results-lists";
                document.body.appendChild(searchResult);
                searchResultsContent.appendChild(searchResult);
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