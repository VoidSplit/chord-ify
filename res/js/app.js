
let addBarre = document.getElementById('addBarre')
let barreInner = document.getElementById('barreInner')
addBarre.addEventListener('click', (e) => {
    console.log('test')
})


const COLORS = [
    {name: "red", variableName: "preset-color-red", code: "rgb(250, 128, 114)"},
    {name: "orange", variableName: "preset-color-orange", code: "rgb(255, 195, 0)"},
    {name: "green", variableName: "preset-color-green", code: "rgb(218, 247, 166)"},
    {name: "blue", variableName: "preset-color-blue", code: "rgb(93, 173, 226)"},
    {name: "transparent", variableName: "preset-color-transparent", code: "rgb(56, 61, 64)"}
]
let GROUPLIST = []
let IDLIST = []
let CHORDIDLIST = []

let groupListDOM = document.getElementById("group-list-wrapper")

let addGroupButton = document.getElementById('addGroup')
let chord = {
    id: undefined,
    name: "Nom de l'accord",
    keys: "000000",
    barres: [],
    move: 0
}

let SELECTEDGROUP

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

class group {
    constructor(color, id, name, chords, state) {
        this.color = color;
        this.id = id;
        this.name = name;
        this.chords = chords;
        this.state = state;
    }
    toggleState(group) {
        switch (this.state) {
            case true:
                this.state = false;
                group.removeAttribute('data-opened')
                break;
            case false:
                this.state = true;
                group.setAttribute('data-opened', '')
                break;
        }
    }
    delete() {
        let tempGroupList = GROUPLIST.filter(el => el.id !== this.id)
        GROUPLIST = [...tempGroupList];
        this.update()
    }
    display(parent) {
        let DOMGroup = document.createElement('div')
        let DOMGroupDisplay = document.createElement('div')
        let DOMGroupDisplayName = document.createElement('div')
        let DOMGroupDisplayColorsWrapper = document.createElement('div')
        let DOMGroupDisplayToggleSize = document.createElement('div')
        let DOMGroupDisplayDelete = document.createElement('div')
        let DOMGroupChordList = document.createElement('div')
        let DOMGroupAddChord = document.createElement('div')
        let DOMGroupChordListInner = document.createElement('div')
        if(this.state == true) DOMGroup.setAttribute('data-opened', '')
        DOMGroup.setAttribute('class', 'group')
        DOMGroupChordListInner.setAttribute('class', 'fr inner')
        DOMGroup.setAttribute('data-color', this.color)
        DOMGroupDisplay.setAttribute('class', 'display fr')
        DOMGroupDisplayName.setAttribute('class', 'name')
        DOMGroupDisplayName.setAttribute('contenteditable', 'true')
        DOMGroupDisplayColorsWrapper.setAttribute('class', 'colors-wrapper fr')
        DOMGroupDisplayToggleSize.setAttribute('class', 'toggle-size')
        DOMGroupDisplayDelete.setAttribute('class', 'delete')
        DOMGroupChordList.setAttribute('class', 'chord-list fr')
        DOMGroupAddChord.setAttribute('class', 'add-chords')
        DOMGroupDisplayName.textContent = this.name
        DOMGroupDisplayDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'
        DOMGroupDisplayToggleSize.innerHTML = '<i class="fa-solid fa-angle-up"></i>'
        DOMGroupAddChord.innerHTML = `<i class="fa-solid fa-square-plus"></i> <p>Ajouter un accord</p>`
        DOMGroupDisplayToggleSize.addEventListener('click', (e) => {
            this.toggleState(DOMGroup)
        })
        DOMGroupDisplayDelete.addEventListener('click', (e) => {
            DOMGroup.classList.add('fadeOut')
            setTimeout(() => {
                this.delete()
            }, 190)
        })
        
        /*this.chords.forEach(ch => {
            let card = document.createElement('div')
            let can = document.createElement('canvas')
            let canctx = can.getContext('2d')

            can.height = 362
            can.width = 200

            // Reset canvas
            canctx.fillStyle = "#fff"
            canctx.fillRect(0, 0, can.width, can.height)
            // Draw name
            canctx.fillStyle = "#000"
            canctx.textAlign = 'center';
            canctx.font = '20px Nunito';
            canctx.fillText(ch.name, can.width / 2, 29)
            // draw empty diagram
            canctx.fillRect(40, 59, can.width - 80, 6)
            for(let i = 1; i <= 4; i++) {
                canctx.fillRect(40,((180/4) * (i+1))+17, can.width - 80, 3)
            }
            for(let i = 1; i<=6; i++) {
                canctx.fillRect((((can.width - 80) / 5) * i) + 15, 59, 3, 186)
            }
            // Draw Symbols
            let formatedKeys = ch.keys.split('')
            formatedKeys.forEach((key, i) => {
                key = key.toLowerCase()
                switch (key) {
                    case "x":
                        canctx.fillText("X", (((can.width - 80) / 5) * (i + 1)) + 16, 54)
                        break;
                    case "0":
                        canctx.fillText("O", (((can.width - 80) / 5) * (i + 1)) + 16, 54)
                        break;
                }
            })
            // Draw points
            formatedKeys.forEach((key, i) => {
                key = key.toLowerCase()
                if(key !== "x" && key !== "0") {
                
                    canctx.beginPath();
                    canctx.arc(
                        (((can.width - 80) / 5) * (i + 1)) + 16,
                        ((180/4) * (parseInt(key)+1))-3,
                        10,
                        0,
                        2 * Math.PI);
                    canctx.fill();
                }
            })
            // Draw barre
            /*ch.barres.forEach(barre => {
                canctx.roundRect(
                    (((can.width - 80) / 5) * (barre.from) - 8), 
                    (((250/4) * (barre.move+2)) - 4.5) - ((250/4) / 2) + 4, 
                    (((can.width - 80) / 5) * (barre.to) - 8) - (((can.width - 80) / 5) * (barre.from -1)), 
                    20, 
                    80
                    ).fill();
            })

            card.classList = "chord"
            console.log(ch)
            DOMGroupChordListInner.append(card)
            card.append(can)
        })*/

        DOMGroupDisplayName.addEventListener('input', this.debounce((e) => this.saveInput(e)))

        DOMGroupAddChord.addEventListener('click', (e) => {
            openChordCreator(this.id)
        })
        COLORS.forEach(color => {
            let element = document.createElement('div')
            element.classList = `color ${color.name}`
            DOMGroupDisplayColorsWrapper.append(element)
            element.addEventListener('click', () => {
                this.color = color.name
                this.update()
            })
        })
        DOMGroup.append(DOMGroupDisplay, DOMGroupChordList)
        DOMGroupDisplay.append(DOMGroupDisplayName,DOMGroupDisplayColorsWrapper,DOMGroupDisplayToggleSize,DOMGroupDisplayDelete)
        DOMGroupChordList.append(DOMGroupAddChord, DOMGroupChordListInner)
        parent.append(DOMGroup)
    }
    
    debounce(func, timeout = 1300){
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        };
    }
    saveInput(evt){
        this.name = evt.target.textContent
        this.update()
    }
    update() {
        drawGroups(GROUPLIST)
    }
    
}


function drawGroups(group) {
    groupListDOM.innerHTML = ""
    group.forEach(group => {
        group.display(groupListDOM)
    })
    updateGroupsDromdown()
}

function openChordCreator() {
    chord = {
        id: undefined,
        name: "Nom de l'accord",
        keys: "000000",
        barres: [],
        move: 0
    }
    SELECTEDGROUP = GROUPLIST[0].name

    previewName.value = ""
    for(key of previewKeys.children) {
        key.value = ""
    }
    barreInner.innerHTML = `<div class="btn" id="addBarre">+</div>`

    let app = document.getElementById('app')
    app.toggleAttribute('data-ChordCreatorOpened')
    
    setTimeout(() => {
        drawChord(canvas, chord)
    }, "1000")
}

function drawChord(canvas, chord) {
    let ctx = canvas.getContext('2d')
    // Reset canvas
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // Draw name
    ctx.fillStyle = "#000"
    ctx.textAlign = 'center';
    ctx.font = '20px Nunito';
    ctx.fillText(chord.name, canvas.width / 2, 35)
    // draw empty diagram
    ctx.fillRect(40, 70, canvas.width - 80, 6)
    for(let i = 1; i <= 4; i++) {
        ctx.fillRect(40,((250/4) * (i+1)) + 4.5, canvas.width - 80, 3)
    }
    for(let i = 1; i<=6; i++) {
        ctx.fillRect((((canvas.width - 80) / 5) * i) + 3, 70, 3, 250)
    }
    // Draw Symbols
    let formatedKeys = chord.keys.split('')
    formatedKeys.forEach((key, i) => {
        key = key.toLowerCase()
        switch (key) {
            case "x":
                ctx.fillText("X", (((canvas.width - 80) / 5) * (i + 1)) + 3, 60)
                break;
            case "0":
                ctx.fillText("O", (((canvas.width - 80) / 5) * (i + 1)) + 3, 60)
                break;
        }
    })
    // Draw points
    formatedKeys.forEach((key, i) => {
        key = key.toLowerCase()
        if(key !== "x" && key !== "0") {

            ctx.beginPath();
            ctx.arc(
                (((canvas.width - 80) / 5) * (i + 1)) + 3,
                (((250/4) * (parseInt(key)+1)) + 4.5) - ((250/4) / 2) + 4,
                10,
                0,
                2 * Math.PI);
            ctx.fill();
        }
    })
    // Draw barre
    chord.barres.forEach(barre => {
        ctx.roundRect(
            (((canvas.width - 80) / 5) * (barre.from) - 8), 
            (((250/4) * (barre.move+2)) - 4.5) - ((250/4) / 2) + 4, 
            (((canvas.width - 80) / 5) * (barre.to) - 8) - (((canvas.width - 80) / 5) * (barre.from -1)), 
            20, 
            80
            ).fill();
    })
    // Draw move
    if(chord.move > 0) {
        ctx.fillText(chord.move, 15, (((250/4) * 2) + 10) - ((250/4) / 2) + 4)
    }
}
function updateGroupsDromdown(main) {
    SELECTEDGROUP = GROUPLIST[0].name
    let groupsDropdown = document.getElementById('groupsDropdown')
    groupsDropdown.innerHTML = ""
    let display = document.createElement('div')
    let displayP = document.createElement('p')
    let ul = document.createElement('ul')

    display.classList = "display"
    ul.classList = "fc"

    if(main == undefined) main = GROUPLIST[0].name
    displayP.textContent = main

    GROUPLIST.filter(group => group.name !== main).forEach(group => {
        let ulLi = document.createElement('li')
        let ulLiP = document.createElement('p')
        ulLi.append(ulLiP)
        ul.append(ulLi)
        ulLiP.textContent = group.name;
        ulLi.addEventListener('click', () => {
            SELECTEDGROUP = group.name
            updateGroupsDromdown(group.name)
        })
    })
    display.append(displayP)
    groupsDropdown.append(display,ul)
}
function init() {
    let searchbar = document.getElementById('searchbar')
    searchbar.addEventListener('input', (e) => {
        let value = e.target.value
        drawGroups(GROUPLIST.filter(group => group.name.toLowerCase().includes(value.toLowerCase())))
    })
    
    addGroupButton.addEventListener('click', () => {
        let id = 0;
        while(IDLIST.includes(id)) {
            id++
        }
        IDLIST.push(id)
        let nGroup = new group(COLORS[4].name, id, "Nouveau Groupe", [], true)
        GROUPLIST.push(nGroup)
        updateGroupsDromdown()
        drawGroups(GROUPLIST)
    })


    drawChord(canvas, chord)
}

let canvas = document.getElementById('preview')
canvas.height = 350
canvas.width = 250

let previewName = document.getElementById('name')
previewName.addEventListener('input', (e) => {
    let value = e.target.value
    chord.name = value
    drawChord(canvas, chord)
})
let previewMove = document.getElementById('move')
previewMove.addEventListener('input', (e) => {
    let value = e.target.value
    if(value <= 20 && value >= 0) {
        chord.move = value
        e.target.classList.remove('error')
        drawChord(canvas, chord)
    } else {
        e.target.classList.add('error')
    }
})
let previewKeys = document.getElementById('keys')

for(key of previewKeys.children) {
    key.addEventListener('input', (e) => {
        let value = e.target.value.toLowerCase()
        let test = ["0", "1", "2", "3", "4", "x"]
        if (value == "") value = "0"
        if (test.includes(value)) {
            let index = e.target.getAttribute("data-index")
            let splitted = chord.keys.split('')
            splitted[parseInt(index)] = value
            chord.keys = splitted.join('')
            drawChord(canvas, chord)
            e.target.classList.remove('error')
        } else 
            e.target.classList.add('error')
    })
}
/*addBarre.addEventListener('click', () => {
    console.log('test')
    let line = document.createElement('div')
    let lineFromInput = document.createElement('input')
    let lineI = document.createElement('i')
    let lineToInput = document.createElement('input')
    let lineMove = document.createElement('input')
    let lineDelete = document.createElement('div')
    line.setAttribute('class', 'line fr')
    lineI.setAttribute('class', 'fa-solid fa-arrow-right')
    lineDelete.setAttribute('class', 'delete')
    lineFromInput.setAttribute('type', 'number')
    lineToInput.setAttribute('type', 'number')
    lineMove.setAttribute('type', 'number')
    
    lineFromInput.setAttribute('max', '5')
    lineToInput.setAttribute('max', '6')
    lineMove.setAttribute('max', '3')
    
    lineFromInput.setAttribute('placeholder', '1')
    lineToInput.setAttribute('placeholder', '6')
    lineMove.setAttribute('placeholder', '0')
    lineFromInput.setAttribute('min', '1')
    lineToInput.setAttribute('min', '2')
    lineMove.setAttribute('min', '0')
    lineFromInput.value = '1'
    lineToInput.value = '6'
    lineMove.value = '0'
    lineDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`
    let newBarre = {
        from: lineFromInput.value, // "1"
        to: lineToInput.value, // "6"
        move: lineMove.value // "0"
    }
    chord.barres.push(newBarre)
    drawChord(canvas, chord)
    lineFromInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value)
        if(!value) value = 1
        if(value < parseInt(newBarre.to) && value >= 1 && value <= 6) {
            newBarre.from = value
            drawChord(canvas, chord)
            e.target.classList.remove('error')
        } else  {
            e.target.classList.add('error')
            value = 1
            newBarre.from = value
            drawChord(canvas, chord)
        }
    })
    
    lineToInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value)
        if(!value) value = 6
        if(value > parseInt(newBarre.from) && value >= 1 && value <= 6) {
            newBarre.to = value
            drawChord(canvas, chord)
            e.target.classList.remove('error')
        } else  {
            e.target.classList.add('error')
            value = 6
            newBarre.to = value
            drawChord(canvas, chord)
        }
    })
    
    lineMove.addEventListener('input', (e) => {
        let value = parseInt(e.target.value)
        if(!value) value = 0
        if(value >= 0 && value <= 3) {
            newBarre.move = value
            drawChord(canvas, chord)
            e.target.classList.remove('error')
        } else {
            e.target.classList.add('error')
            value = 0
            newBarre.move = value
            drawChord(canvas, chord)
        }
    })
    lineDelete.addEventListener('click', () => {
        barreInner.removeChild(line)
        chord.barres = chord.barres.filter(barre => barre !== newBarre)
        drawChord(canvas, chord)
    })
    line.append(lineFromInput,lineI,lineToInput,lineMove,lineDelete)
    barreInner.insertBefore(line, addBarre)
})*/
let submitButton = document.getElementById('submitBtn')
submitButton.addEventListener('click', (e) => {
    let id = 0;
    while(CHORDIDLIST.includes(id)) {
        id++
    }
    CHORDIDLIST.push(id)
    chord.id = id
    GROUPLIST.filter(group => group.name == SELECTEDGROUP)[0].chords.push(chord)
    openChordCreator()
    drawGroups(GROUPLIST)
})

init()