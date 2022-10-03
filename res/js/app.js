const COLORS = [
    {name: "red", variableName: "preset-color-red", code: "rgb(250, 128, 114)"},
    {name: "orange", variableName: "preset-color-orange", code: "rgb(255, 195, 0)"},
    {name: "green", variableName: "preset-color-green", code: "rgb(218, 247, 166)"},
    {name: "blue", variableName: "preset-color-blue", code: "rgb(93, 173, 226)"},
    {name: "transparent", variableName: "preset-color-transparent", code: "rgb(56, 61, 64)"}
]
let GROUPLIST = []
let IDLIST = []

let groupListDOM = document.getElementById("group-list-wrapper")

let addGroupButton = document.getElementById('addGroup')

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
        if(this.state == true) DOMGroup.setAttribute('data-opened', '')
        DOMGroup.setAttribute('class', 'group')
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
        

        DOMGroupDisplayName.addEventListener('input', this.debounce((e) => this.saveInput(e)))

        DOMGroupAddChord.addEventListener('click', (e) => {
            openChordCreator(this.id)
        })
        COLORS.forEach(color => {
            let element = document.createElement('div')
            element.classList = `color ${color.name}`
            DOMGroupDisplayColorsWrapper.append(element)
            element.addEventListener('click', (e) => {
                this.color = color.name;
                this.update()
            })
        })
        DOMGroup.append(DOMGroupDisplay, DOMGroupChordList)
        DOMGroupDisplay.append(DOMGroupDisplayName,DOMGroupDisplayColorsWrapper,DOMGroupDisplayToggleSize,DOMGroupDisplayDelete)
        DOMGroupChordList.append(DOMGroupAddChord)
        parent.append(DOMGroup)
    }
    
    debounce(func, timeout = 300){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
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
}

function openChordCreator(id) {
    let app = document.getElementById('app')
    app.toggleAttribute('data-ChordCreatorOpened')
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

function init() {

    let searchbar = document.getElementById('searchbar')
    searchbar.addEventListener('input', (e) => {
        let value = e.target.value

        drawGroups(GROUPLIST.filter(group => group.name.toLowerCase().includes(value.toLowerCase())))
    })
    
    addGroupButton.addEventListener('click', (e) => {
        let id = 0;
        while(IDLIST.includes(id)) {
            id++
        }
        IDLIST.push(id)
        let nGroup = new group(COLORS[4].name, id, "Nouveau Groupe", [], true)
        GROUPLIST.push(nGroup)
        drawGroups(GROUPLIST)
    })

    let canvas = document.getElementById('preview')
    canvas.height = 350
    canvas.width = 250
    
    let chord = {
        name: "Nom de l'accord",
        keys: "000000",
        barres: [
            /*{
                from: 1,
                to: 6,
                move: 1
            },
            {
                from: 3,
                to: 5,
                move: 3
            }*/
        ],
        move: 0
    }
    
    let previewName = document.getElementById('name')
    previewName.addEventListener('input', (e) => {
        let value = e.target.value
        chord.name = value
        drawChord(canvas, chord)
    })
    let previewMove = document.getElementById('move')
    previewMove.addEventListener('input', (e) => {
        let value = e.target.value
        chord.move = value
        drawChord(canvas, chord)
    })
    let previewKeys = document.getElementById('keys')

    
    for(key of previewKeys.children) {
        key.addEventListener('input', (e) => {
            let index = e.target.getAttribute("data-index")
            let splitted = chord.keys.split('')
            splitted[parseInt(index)] = e.target.value
            chord.keys = splitted.join('')
            drawChord(canvas, chord)
        })
    }

    let addBarre = document.getElementById('addBarre')
    let barreInner = document.getElementById('barreInner')
    addBarre.addEventListener('click', (e) => {
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
        lineDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`

        lineDelete.addEventListener('click', (e) => {
            barreInner.removeChild(line)
        })

        line.append(lineFromInput,lineI,lineToInput,lineMove,lineDelete)

        barreInner.insertBefore(line, addBarre)
    })
    drawChord(canvas, chord)
}
init()