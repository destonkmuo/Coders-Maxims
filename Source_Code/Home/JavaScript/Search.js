var results = [];

function Search() {
    var input = document.getElementById("input-search").value.toLowerCase();
    
    fetch("../Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let i = 0; i < modules.length; i++) {
                if(results.includes(modules[i].url) && results.length > 0) { return; } else { // Guard Clause for Overlapping Urls
                if (input.includes(modules[i].name.toLowerCase())) {
                    console.log("found... appending url");
                    results.push(modules[i].url);
                } else if (modules[i].keyTerms.includes(input)) {
                    console.log("found... appending url");
                    results.push(modules[i].url);
                    console.log(results);
                }
                if(!results.includes(modules[i].url)) {
                    results = [];
                }
                console.log(results);
            }
                //If Input is a Beyond Percentage Threshold then Instantiate URL as well?
        }
        })
    }