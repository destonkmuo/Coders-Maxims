window.addEventListener('load', function() {
    fetch("/default_attributes/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            const devLog = true;

            var usersQuery = decodeURIComponent(this.location.search.substring(1)).split()[0].replace('search=', '').split(' ').sort((b, a) => a.length - b.length);

            console.log(usersQuery);

            var getJSON = async url => {
                const response = await fetch(url);
                if (!response.ok) throw new Error(response.statusText);
                const data = response.json();
                return data;
            }

            var results = [];
            var urlCount = 0;
            var paginationCount = 0;
            getJSON("https://raw.githubusercontent.com/6/stopwords-json/fca10ee6724fdfae58b9e72e43ac7d4a6ae9cd45/dist/en.json").then(data => { //Bottom doesn't run otherwise, needs to change

                for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {

                    function instantiateResult(foundFromName) {
                        var searchResultsContent = document.getElementsByClassName(`global-search-results-content ${paginationCount}`)[0]
                        if (urlCount <= 6) {
                            var searchResult = document.createElement("a");
                            searchResult.innerHTML = modules[modulesIndex].name;
                            searchResult.href = modules[modulesIndex].url;
                            searchResult.className = "results-lists";
                            document.body.appendChild(searchResult);

                            var searchResultDescription = document.createElement('p');
                            searchResultDescription.innerHTML = modules[modulesIndex].description;
                            searchResultDescription.id = "searchResultDescription";
                            searchResultDescription.className = "results-lists";
                            document.body.appendChild(searchResultDescription);

                            if(!foundFromName) { //Pushes search results found from their names to the top
                                searchResultsContent.appendChild(searchResult);
                                searchResultsContent.appendChild(searchResultDescription);
                            } else {
                                searchResultsContent.insertBefore(searchResultDescription, searchResultsContent.firstChild);
                                searchResultsContent.insertBefore(searchResult, searchResultsContent.firstChild);
                            }
                            urlCount += 1;
                            // For Loop This as text being the found description

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
                    usersQuery = usersQuery.filter(stopWords => !data.includes(stopWords));

                    if ((results.includes(modules[modulesIndex].name)) || usersQuery == "") {
                        if (devLog) console.error(`Users Query is Negligble or Already Contains User Input... Resetting: ${Array.from(results.values())}`)
                    } else if ((modules[modulesIndex].name.toLowerCase().includes(usersQuery.find(name => modules[modulesIndex].name.toLowerCase().includes(name)))) && usersQuery.length > 0) {
                        if (devLog) console.log(`Found from Name ${modules[modulesIndex].name}... Appending Potential href`)
                        results.push(modules[modulesIndex], modules[modulesIndex].name);
                        instantiateResult(true);
                    } else if (modules[modulesIndex].keyTerms.some(keyTerms => usersQuery.includes(keyTerms)) && usersQuery.length > 0) {
                        if (devLog) console.log(`Found from KeyTerms ${modules[modulesIndex].name}... Appending Potential href`)
                        results.push(modules[modulesIndex], modules[modulesIndex].name);
                        instantiateResult();
                    } else if ((modules[modulesIndex].description.toLowerCase().includes(usersQuery.find(desc => modules[modulesIndex].description.toLowerCase().includes(desc)))) && usersQuery.length > 0) {
                        if (devLog) console.log(`Found from Description ${modules[modulesIndex].name}... Appending Potential href`)
                        results.push(modules[modulesIndex], modules[modulesIndex].name);
                        instantiateResult();
                    }
                }
                if(results.length > 0) {
                    let originalTxt = $("p").html();
                    for(let i = 0; i < usersQuery.length; i++) {
                        $(function() {
                            var highlightHtml = '<span class="highlight">$1</span>';
                            var term = usersQuery[i];
                            console.log(term)

                            var txt = $("p").html();
                            if(term !== '') {
                                console.log(originalTxt.toLowerCase().match(new RegExp('(' + term + ')', 'gi')))
                                txt = txt.replace(new RegExp('(' + term + ')', 'gi'), highlightHtml);

                                if(usersQuery.some(queryTerm => queryTerm.includes(term))) {
                                    //console.log(usersQuery.filter(queryTerm => queryTerm.includes(term)))
                                }
                            }    
                            $("p").html(txt);
                    });
                    }

                }

                //12 max till paginated
                if (devLog) console.log(results);
                var paginationDiv = this.document.getElementsByClassName('pagination');

                if (document.getElementById("global-search-results-content").childNodes.length > 0) {
                    for (let i = 0; i <= paginationCount; i++) {
                        var paginationLink = this.document.createElement('button');
                        paginationLink.innerHTML = i + 1;
                        paginationLink.className = "pageLink";
                        paginationLink.onclick = function pagination() {
                            document.getElementById('gsrc-container').scrollTo(0,0);

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
                } else {
                    const returnContainer = this.document.getElementById("return");

                    var noResults = this.document.createElement('h1');
                    noResults.innerHTML = "Sorry We Couldn't Find What You Were Searching For...";
                    this.document.body.append(noResults);
                    returnContainer.append(noResults);

                    var returnHome = this.document.createElement('a');
                    returnHome.href = "/";
                    returnHome.innerHTML = "Return Home";
                    this.document.body.append(returnHome);
                    returnContainer.append(returnHome);

                }
            })
        })
})