function jumpTo(Container, heightAdj) {
    var jumpPosition = document.getElementById(Container).offsetTop;
    window.scrollTo(0,jumpPosition + heightAdj);
}