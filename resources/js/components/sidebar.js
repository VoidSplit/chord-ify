function getSidebar() {
    let sidebarElement = document.createElement('div')
    sidebarElement.classList = 'comp sidebar fc'
    sidebarElement.innerHTML = `<div class="top selectable" tabindex="0">
        <div class="logo">
            <img src="resources/images/logo.svg" alt="Logo du site">
        </div>
        <span>Better Chords</span>
    </div>
    <ul class="fc">
        <div class="top fr">
            <div class="icon fr"><i class="fa-solid fa-layer-group"></i></div>
            <p>gestion de la gallerie</p>
        </div>
        <div class="list fc">
            <li class="selectable fr active" tabindex="0">Voir la galerie</li>
            <li class="selectable fr" tabindex="0">Ajouter un accord</li>
        </div>
    </ul>
    <ul class="fc">
        <div class="top fr">
            <div class="icon fr"><i class="fa-solid fa-bookmark"></i></div>
            <p>gallerie partagée</p>
        </div>
        <div class="list fc">
            <li class="selectable fr" tabindex="0">Voir la galerie</li>
            <li class="selectable fr" tabindex="0">Ajouter un accord</li>
        </div>
    </ul>
    `
    sidebarElement.appendChild(getToggleMode())
    return sidebarElement;
}