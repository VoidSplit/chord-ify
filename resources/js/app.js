function init() {
    displayElementTo(getSidebar(), document.getElementById('app'))
    displayElementTo(generateGalleryPage(), document.getElementById('app'))
}
function displayElementTo(element, parent)  {
    parent.appendChild(element)
}
init()

const DATA = {
    groups: [],
    theme: "dark"
}

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
    let groupListElement = document.createElement('div')
    groupListElement.classList = 'fc'
    groupListElement.setAttribute('id', 'galeryGroupList')

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
        let id = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        let fixedId = id()
        DATA.groups.push({
            id: fixedId,
            index: DATA.groups.length,
            name: "",
            opened: true,
            chords: []
        })
        displayGroups()
    })

    page.append(navigation,groupListElement)
    navigation.append(navigationSearchBar,navigationButtonWrapper)
    navigationSearchBar.append(navigationSearchBarInput)
    navigationButtonWrapper.append(navigationButton)

    return page
}
function displayGroups() {
    let parent = document.getElementById('galeryGroupList')
    parent.innerHTML = ''
    DATA.groups.forEach(groupE => {
        let id = groupE.id
        let group = document.createElement('div')
        let groupTop = document.createElement('div')
        let groupTopP = document.createElement('p')
        let groupTopActions = document.createElement('div')
        let groupTopActionsModify = document.createElement('div')
        let groupTopActionsToggle = document.createElement('div')
        let groupTopActionsFullscreen = document.createElement('div')
        let groupTopActionsDelete = document.createElement('div')
        if(groupE.opened == true) group.classList = "group fc opened";
        else group.classList = "group fc closed";
        group.setAttribute('tabindex', "0")
        group.setAttribute('style', "--outlineColor: var(--background)")
        groupTop.classList = "top fr"
        DATA.groups.filter(g => g.id == id)[0].name = modifyName(id, 'Nouveau groupe')
        groupTopP.textContent = DATA.groups.filter(g => g.id == id)[0].name 
        groupTopActions.classList = "actions fr"
        groupTopActionsModify.classList = "modify"
        groupTopActionsModify.setAttribute('tabindex', "0")
        groupTopActionsModify.innerHTML = `<i class="fa-solid fa-pen"></i>`
        groupTopActionsToggle.classList = "close"
        groupTopActionsToggle.setAttribute('tabindex', "0")
        groupTopActionsToggle.innerHTML = `<i class="fa-solid fa-angle-down"></i>`
        groupTopActionsFullscreen.classList = "fullscreen"
        groupTopActionsFullscreen.setAttribute('tabindex', "0")
        groupTopActionsFullscreen.innerHTML = `<i class="fa-solid fa-expand"></i>`
        groupTopActionsDelete.classList = "delete"
        groupTopActionsDelete.setAttribute('tabindex', "0")
        groupTopActionsDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`
        groupTopActionsToggle.addEventListener('click', (e) => {
            group.classList.toggle('closed')
            group.classList.toggle('opened')
            if(DATA.groups.filter(g => g.id == id)[0].opened == true) {
                DATA.groups.filter(g => g.id == id)[0].opened = false
            }
            else if(DATA.groups.filter(g => g.id == id)[0].opened == false) {
                DATA.groups.filter(g => g.id == id)[0].opened = true
            }
        })
        groupTopActionsModify.addEventListener('click', (e) => {
            openModifyGroupModal(id, group)
            groupTopP.textContent = DATA.groups.filter(g => g.id == id)[0].name 
        })
        groupTopActionsFullscreen.addEventListener('click', (e) => {
            console.log("fullScreen")
        })
        groupTopActionsDelete.addEventListener('click', (e) => {
            let newList = DATA.groups.filter(g => g.id !== id);
            DATA.groups = []
            DATA.groups.push(...newList)
            displayGroups()
        })
        let inner = document.createElement('div')
        inner.classList = "inner fr horizontal-scroll"
        let addChord = document.createElement('div')
        addChord.classList = "add-chord fc"
        addChord.setAttribute('tabindex', "0")
        addChord.innerHTML = `
            <div class="center"><i class="fa-solid fa-square-plus"></i></div>
            <p>Ajouter un accord</p>
        `
        addChord.addEventListener('click', (e) => {
            console.log(DATA, id)
        })
        group.append(groupTop, inner)
        groupTop.append(groupTopP,groupTopActions)
        groupTopActions.append(groupTopActionsToggle,groupTopActionsFullscreen,groupTopActionsModify,groupTopActionsDelete)
        inner.append(addChord)
        parent.append(group)
    })
}
function modifyName(id, name) {
    let groupList = [...DATA.groups.filter(g => g.id !== id)]
    let list = []
    groupList.forEach(el => { list.push(el.name) })
    if(list.filter(e => e == name).length == 0) return DATA.groups.filter(g => g.id == id)[0].name = name
        else {
            let nameList = []
            list.forEach(el => {
                let arraySplitted = el.split(' ')
                let last = arraySplitted[arraySplitted.length - 1]
                if(last.substring(0,1) == "(") arraySplitted.pop()
                let actualName = arraySplitted
                nameList.push(actualName.join(' '))
            })
            return DATA.groups.filter(g => g.id == id)[0].name = `${name} (${nameList.filter(n => n == name).length})`
        }
}

function openModifyGroupModal(id, parent) {
    /*let modal = document.createElement('div')
    modal.classList = "modifyGroupModal fc"
    let submitButton = document.createElement('div')
    submitButton.classList = "btn"
    submitButton.textContent = 'Valider'
    modal.append(submitButton)
    parent.append(modal)*/
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