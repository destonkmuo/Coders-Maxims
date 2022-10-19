var rmList = document.getElementById('rm-list');

window.addEventListener('load', function() {
    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {
            for(let i = 0; i < modules.length; i++) {
                var rmListItemHyperLink = document.createElement('a');
                rmListItemHyperLink.innerHTML = ` ~ ${modules[i].name} Created On ${modules[i].datePublished}.`;
                rmListItemHyperLink.href = modules[i].href;
                document.body.appendChild(rmListItemHyperLink);
                
                var rmListItem = document.createElement('li');
                rmListItem.className = "rm-list-item";
                rmListItem.innerHTML = `${modules[i].moduleIdentifier}: ${modules[i].description}`;
                
                document.body.appendChild(rmListItem);
                rmListItem.appendChild(rmListItemHyperLink);
                rmList.appendChild(rmListItem);
            }
        })
})