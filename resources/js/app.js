function init() {
    displayElementTo(getSidebar(), document.getElementById('app'))
    displayElementTo(generateGalleryPage(), document.getElementById('app'))
}
function displayElementTo(element, parent)  {
    parent.appendChild(element)
}
init()

function generateGalleryPage() {
    let page = document.createElement('div')

    /**
     * Navigation
     */
    let navigation = document.createElement('nav')
    let navigationSearchBar = document.createElement('div')
    let navigationSearchBarInput = document.createElement('input')
    let navigationButtonWrapper = document.createElement('div')
    let navigationButton = document.createElement('div')

    page.classList = "section fc";

    navigation.classList = "gallery-navigation fr"
    navigationSearchBar.classList = "search-bar"
    navigationSearchBarInput.setAttribute('type', 'text')
    navigationSearchBarInput.setAttribute('placeholder', 'Rechercher..')
    navigationButtonWrapper.classList = "add-group"
    navigationButton.classList = "btn"
    navigationButton.innerText = "Ajouter un groupe"
    navigationButton.setAttribute('tabindex', "0")

    navigationButton.addEventListener('click', (e) => {
        addGroup(page)
    })

    page.append(navigation)
    navigation.append(navigationSearchBar,navigationButtonWrapper)
    navigationSearchBar.append(navigationSearchBarInput)
    navigationButtonWrapper.append(navigationButton)

    /**
     * 
     */

    return page
}
function addGroup(parent) {
    let group = document.createElement('div')
    let groupTop = document.createElement('div')
    let groupTopP = document.createElement('p')
    let groupTopActions = document.createElement('div')
    let groupTopActionsToggle = document.createElement('div')
    let groupTopActionsFullscreen = document.createElement('div')
    let groupTopActionsDelete = document.createElement('div')

    group.classList = "group fc opened";
    group.setAttribute('tabindex', "0")

    groupTop.classList = "top fr"

    groupTopP.textContent = "Groupe 1"

    groupTopActions.classList = "actions fr"

    groupTopActionsToggle.classList = "close"
    groupTopActionsToggle.setAttribute('tabindex', "0")
    groupTopActionsToggle.innerHTML = `<i class="fa-solid fa-angle-down"></i>`

    groupTopActionsToggle.addEventListener('click', (e) => {
        group.classList.toggle('closed')
        group.classList.toggle('opened')
    })

    groupTopActionsFullscreen.classList = "fullscreen"
    groupTopActionsFullscreen.setAttribute('tabindex', "0")
    groupTopActionsFullscreen.innerHTML = `<i class="fa-solid fa-expand"></i>`

    groupTopActionsDelete.classList = "delete"
    groupTopActionsDelete.setAttribute('tabindex', "0")
    groupTopActionsDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`

    
    let inner = document.createElement('div')
    inner.classList = "inner fr horizontal-scroll"

    let addChord = document.createElement('div')
    addChord.classList = "add-chord fc"
    addChord.setAttribute('tabindex', "0")
    addChord.innerHTML = `
        <div class="center"><i class="fa-solid fa-square-plus"></i></div>
        <p>Ajouter un accord</p>
    `


    group.append(groupTop, inner)
    groupTop.append(groupTopP,groupTopActions)
    groupTopActions.append(groupTopActionsToggle,groupTopActionsFullscreen,groupTopActionsDelete)
    inner.append(addChord)


    parent.append(group)
}
function testPage() {
    let page = document.createElement('div')
    page.classList = "section fc"
    page.innerHTML = `
    <div class="group fc" tabindex="0">
        <div class="top fr">
            <p>Groupe 1</p>
            <div class="actions fr">
                <div class="close" tabindex="0">
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div class="fullscreen" tabindex="0">
                <i class="fa-solid fa-expand"></i>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="inner fr horizontal-scroll">
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="chord fc" tabindex="0">
                    <div class="infos"></div>
                    <canvas>Votre navigateur ne prends pas en charge les canvas, veuillez essayer avec un autre navigateur</canvas>
                    <div class="btn">Télécharger</div>
                </div>
                <div class="add-chord fc" tabindex="0">
                    <div class="center"><i class="fa-solid fa-square-plus"></i></div>
                    <p>Ajouter un accord</p>
                </div>
            </div>
        </div>
        
    </div>
    <div class="group fc" tabindex="0">
        <div class="top fr">
            <p>Nouveau groupe</p>
            <div class="actions fr">
                <div class="open" tabindex="0">
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div class="fullscreen" tabindex="0">
                <i class="fa-solid fa-expand"></i>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="inner fr horizontal-scroll">
                
            </div>
        </div>
        
    </div>
    
    `
    return page
}