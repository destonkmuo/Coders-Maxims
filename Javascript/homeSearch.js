function HomeSearch() {
    const searchResultsContent = document.getElementById('home-search-results-content');
    const searchBox = document.getElementById('home-search-box');
    const devLog = false;

    var input = document.getElementById("home-input-search").value.toLowerCase();
    var results = new Set();
  
    function resetResults() {
        while (searchResultsContent.firstChild) {searchResultsContent.removeChild(searchResultsContent.lastChild) }
        results.clear();
    }
  

    document.getElementById("home-input-search").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' && input != "") {
            window.location.href = `/GlobalSearch/?search=${input}`;
        }
    });

    fetch("/default_attributes/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for (let modulesIndex = 0; modulesIndex < modules.length; modulesIndex++) {

                function instantiateResult() {
                    if(searchResultsContent.childNodes.length < results.size) {
                    var searchResult = document.createElement("a");
                    searchResult.innerHTML = `🔍︎ ${modules[modulesIndex].name}`;
                    searchResult.href = modules[modulesIndex].href;
                    searchResult.className = "home-results-lists";
                    document.body.appendChild(searchResult);
                    searchResultsContent.appendChild(searchResult);
                    }
                }

                if (results.has(modules[modulesIndex].href || input == "")) {
                    if(devLog) console.error(`Results Contains Space or Already Contains User Input... Resetting: ${results}`);
                }  else if((modules[modulesIndex].name.toLowerCase().includes(input)) && input.length > 0 && results.size < 6){
                    if(devLog) console.log(`Found ${modules[modulesIndex].name}... Appending Potential href`) 
                    results.add(modules[modulesIndex].href);
                    instantiateResult();
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
  
    if(devLog) console.log(`Search Request Complete: ${Array.from(results.values())}`);
    resetResults();
  }
  
  window.addEventListener('load', function() {
  var currentString = [];
  var currentSecArrPos = 0;
  var arrOfWordsPostion = 0;
  var timeSpeed = 150;
  var arrOfWords = [["H","e","l","l","o"," ","W","o","r","l","d"," "," "," "],["A","l","g","o","r","i","t","h","m","s"," "," "," "],["D", "a", "t", "a"," ", "S", "t", "r", "u", "c", "t", "u", "r", "e","s"," "," "," "],["C", "o", "m", "p", "u", "t", "e", "r"," ", "H", "i", "s", "t", "o", "r", "y"," "," "," "]];
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