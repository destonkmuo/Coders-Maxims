window.addEventListener('load', function() {

    fetch("/Metadata/Modules.json")
        .then(response => response.json())
        .then(modules => {

        const usersQuery = decodeURIComponent(this.location.search.substring(1)).split()[0].replace('search=','');
        //console.log(document.body.querySelector("main").outerHTML);
        console.log(usersQuery);
    })
})