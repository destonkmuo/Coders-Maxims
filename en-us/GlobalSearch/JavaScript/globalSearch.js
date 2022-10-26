window.addEventListener('load', function() {
    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            const usersQuery = decodeURIComponent(this.location.search.substring(1)).split()[0].replace('search=', '').split(' ');
            const devLog = true;

            var urlCount = 0;

            var paginationCount = 0;

            var searchResultContent = document.createElement('div');
            searchResultContent.id = `global-search-results-content`;
            searchResultContent.className = `global-search-results-content ${paginationCount}`;
            document.body.append(searchResultContent);
            document.getElementById('gsrc-container').appendChild(searchResultContent);

            var results = [];
    
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {

                function instantiateResult() {
                    if(urlCount <= 6) {
                            var searchResult = document.createElement("a");
                            searchResult.innerHTML = modules[modulesIndex].name;
                            searchResult.href = modules[modulesIndex].url;
                            searchResult.className = "results-lists";
                            document.body.appendChild(searchResult);
                            document.getElementsByClassName(`global-search-results-content ${paginationCount}`)[0].appendChild(searchResult);

                            var searchResultDescription = document.createElement('p');
                            searchResultDescription.innerHTML = modules[modulesIndex].description;
                            searchResultDescription.id = "searchResultDescription";
                            searchResultDescription.className = "results-lists";
                            document.body.appendChild(searchResultDescription);
                            document.getElementsByClassName(`global-search-results-content ${paginationCount}`)[0].appendChild(searchResultDescription);
                            urlCount += 1;
                    } else {
                        paginationCount += 1;
                        urlCount = 0;
                        var searchResultContent = document.createElement('div');
                        searchResultContent.id = `global-search-results-content`;
                        searchResultContent.className = `global-search-results-content ${paginationCount}`;
                        searchResultContent.style.visibility = "hidden";
                        document.body.append(searchResultContent);
                        document.getElementById('gsrc-container').appendChild(searchResultContent);
                    }
                }

                //Add Some form of subtext just like google that consist of the description

                if ((results.includes(modules[modulesIndex].name)) || usersQuery == "") {
                    if (devLog) console.error(`Users Query is Negligble or Already Contains User Input... Resetting: ${Array.from(results.values())}`)
                } else if((modules[modulesIndex].name.toLowerCase().includes(usersQuery.find(name => modules[modulesIndex].name.toLowerCase().includes(name)))) && usersQuery.length > 0){
                    if(devLog) console.log(`Found from Name ${modules[modulesIndex].name}... Appending Potential href`)
                    results.push(modules[modulesIndex]); results.push(modules[modulesIndex].name);
                    instantiateResult();
                } else if (modules[modulesIndex].keyTerms.some(keyTerms => usersQuery.includes(keyTerms)) && usersQuery.length > 0) {
                    if (devLog) console.log(`Found from KeyTerms ${modules[modulesIndex].name}... Appending Potential href`)
                    results.push(modules[modulesIndex]); results.push(modules[modulesIndex].name);
                    instantiateResult();
                }
            }
            //12 max till paginated
            if(devLog) console.log(results);
            var paginationDiv = this.document.getElementsByClassName('pagination');
            
            for(let i = 0; i <= paginationCount; i++) {
                var paginationLink = this.document.createElement('button');
                paginationLink.innerHTML = i + 1;
                paginationLink.className = "pageLink";
                paginationLink.onclick = function pagination() {

                    document.querySelectorAll('.pageLink').forEach(pageLink => {
                        pageLink.id = "not-active";
                    })

                    document.querySelectorAll('#global-search-results-content').forEach(gsrc => {
                        gsrc.style.visibility = "hidden";
                    })

                    document.getElementsByClassName(`global-search-results-content ${i}`)[0].style.visibility = "visible";
                    document.getElementsByClassName('pageLink')[i].id = "active";
                }
                this.document.body.append(paginationLink);
                paginationDiv[0].appendChild(paginationLink);
            }

            document.getElementsByClassName('pageLink')[0].id = "active";
        })
    })

