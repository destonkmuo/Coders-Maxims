var rmList = document.getElementById('rm-list');
window.addEventListener('load', function() {
    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for(let i = modules.length - 1; i > modules.length - 10; i--) {
                var rmListItemHyperLink = document.createElement('a');
                rmListItemHyperLink.innerHTML = `${modules[i].name} ~ Created On ${modules[i].datePublished}  : `;
                rmListItemHyperLink.href = modules[i].url;
                document.body.appendChild(rmListItemHyperLink);
                
                var rmListItem = document.createElement('li');
                rmListItem.className = "rm-list-item";

                var rmListDesc = this.document.createElement('p');
                rmListDesc.innerHTML = `‎ ‎ ‎ ‎ ${modules[i].description}`;
                
                document.body.appendChild(rmListItem);
                rmListItem.appendChild(rmListItemHyperLink);
                rmListItem.appendChild(rmListDesc);
                rmList.appendChild(rmListItem);
            }
        })
})