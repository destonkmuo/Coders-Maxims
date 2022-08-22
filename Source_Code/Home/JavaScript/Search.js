function Search() {
    var modules = JSON.parse(Modules);
    var input;
    input = document.getElementById("input-search");
    console.log(input.value);
    console.log(modules[0].name);
}
