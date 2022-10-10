window.addEventListener('load', function() {
var nav = document.getElementById('nav');


var navList = document.createElement('ul');
navList.className = "nav-list";
document.body.appendChild(navList);
nav.appendChild(navList);

/////////////////////////////////////

var navListItem = document.createElement('li');
navListItem.className = "nav-list-item";

var href = document.createElement('a');
href.href = "../Home/";

var CMLogo = document.createElement("img");
CMLogo.src = "Static/CodersMaximsLogo.png";
CMLogo.id = "HeaderLogo";

document.body.appendChild(navListItem);
document.body.appendChild(href);
document.body.appendChild(CMLogo);

href.appendChild(CMLogo);
navListItem.appendChild(href);
navList.appendChild(navListItem);

///////////////////////////////////////////////
var navInfo = [["Home","../Home/"],["Modules","#"],["Overview","#"],["Resources","#"],["Projects","#"],["References","#"],["Contact","#"]];
for(i = 0; i < navInfo.length; i++) {
var navListItem = document.createElement('li');
navListItem.className = "nav-list-item";

var href = document.createElement('a');
href.href = navInfo[i][1];

href.innerHTML = navInfo[i][0];

document.body.appendChild(navListItem);
document.body.appendChild(href);

navListItem.appendChild(href);
navList.appendChild(navListItem);
}

///////////////////////////////////////////////

var navListItem = document.createElement('li');
navListItem.className = "nav-list-item";

var searchBoxDiv = document.createElement('div');
searchBoxDiv.className = "search-box";
searchBoxDiv.id = "search-button";

var searchButton = document.createElement('button');
searchButton.className = "btn-search";

var searchButtonImg = document.createElement('img');
searchButtonImg.src = "Static/SearchLogo.png";
searchButtonImg.id = "SearchLogo";

var faSearch = document.createElement('i');
faSearch.className = "fa fa-search";

var input = document.createElement('input');
input.type = "text";
input.name = "";
input.id = "input-search";
input.setAttribute("onkeyup", "Search()");
input.placeholder= "Search...";

var resultsContent = document.createElement('ul');
resultsContent.id = "results-content";

document.body.appendChild(navListItem);
document.body.appendChild(searchBoxDiv);
document.body.appendChild(searchButton);
document.body.appendChild(searchButtonImg);
document.body.appendChild(faSearch);
document.body.appendChild(input);
document.body.appendChild(resultsContent);

searchBoxDiv.appendChild(searchButton);
searchBoxDiv.appendChild(faSearch);
searchBoxDiv.appendChild(input);
searchBoxDiv.appendChild(resultsContent);
searchButton.appendChild(searchButtonImg);

navListItem.appendChild(searchBoxDiv);
navList.appendChild(navListItem);
///////////////////////////////////////////////

})
