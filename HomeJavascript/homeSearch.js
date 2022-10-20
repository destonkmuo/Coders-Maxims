function HomeSearch() {
    var searchResultsContent = document.getElementById('home-search-results-content');
    var searchBox = document.getElementById('home-search-box');
    var results = new Set();
  
    var devLog = false;
  
    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results = new Set();
    }
  
    document.getElementById("home-input-search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' && input != "") {
            window.location.href = `/en-us/GlobalSearch/?search=${input}`;
        }
    });

    var input = document.getElementById("home-input-search").value.toLowerCase();
    fetch("Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {
                if (input == " " || results.has(modules[modulesIndex].href)) {
                    if(devLog) { console.error(`Results Already Contains User Input... Resetting: ${results}, Or Space Is The Only Input`) }
                    resetResults();
                    return;
                } else if(modules[modulesIndex].keyTerms.filter(keyTerms => keyTerms.startsWith(input)).length > 0 && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.add(modules[modulesIndex].href);
                } else if((modules[modulesIndex].name.replace(' ','').toLowerCase().startsWith(input.replace(' ',''))) && input.length > 0){
                    if(devLog) { console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) }
                    results.add(modules[modulesIndex].href);
                }
                
                if (results.has(modules[modulesIndex].href)) {
                    var searchResult = document.createElement("a");
                    searchResult.innerHTML = modules[modulesIndex].name;
                    searchResult.href = modules[modulesIndex].href;
                    searchResult.className = "home-results-lists";
                    document.body.appendChild(searchResult);
                    searchResultsContent.appendChild(searchResult);
                }
            }
  
            function visibility(boolean) {
                if (boolean) {
                    searchResultsContent.style.visibility = "visible";
                    searchResultsContent.style.opacity = "75%";
                    searchResultsContent.style.pointerEvents = "all";
                } else {
                    searchResultsContent.style.visibility = "hidden";
                    searchResultsContent.style.opacity = "0%";
                    searchResultsContent.style.pointerEvents = "none";
                }
            }
  
            results.size > 0 ? visibility(true) : visibility(false);
            searchBox.onmousedown = function() { if (results.size > 0) { visibility(true) }}
            searchBox.onmouseleave = function() { visibility(false) }
        })
  
    if(devLog) { console.log(`Search Request Complete: ${results.values()}`); }
    resetResults();
  }
  
  window.addEventListener('load', function() {
  var currentString = [];
  var currentSecArrPos = 0;
  var arrOfWordsPostion = 0;
  var timeSpeed = 150;
  var arrOfWords = [["H","e","l","l","o"," ","W","o","r","l","d"," "," "," "],["F","o","r"," ","L","o","o","p","s"," "," "," "],["A","l","g","o","r","i","t","m","s"," "," "," "],["D", "a", "t", "a"," ", "S", "t", "r", "u", "c", "t", "u", "r", "e","s"," "," "," "],["C", "o", "m", "p", "u", "t", "e", "r"," ", "H", "i", "s", "t", "o", "r", "y"," "," "," "]];
  var interval = setInterval(function(){
  document.getElementById("home-input-search").placeholder = `Search... ${currentString.join("")}`;
  
  if(arrOfWordsPostion == arrOfWords.length) {
    arrOfWordsPostion = 0;
  } else if(currentSecArrPos < arrOfWords[arrOfWordsPostion].length) {
  currentString.push(arrOfWords[arrOfWordsPostion][currentSecArrPos]);
  currentSecArrPos += 1;
  } else if(currentString.length > 0){
    currentString.pop();
  } else if(currentString.length == 0) {
    currentSecArrPos = 0;
    arrOfWordsPostion += 1;
  }
  }, timeSpeed);
  })