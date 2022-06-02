console.info('Script Loaded')
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
}
function addChordToGallery(chord) {
    function draw(chord) {
        let keys = chord.keys.split('')
        canvas.height = 250
        canvas.width = 200
        let ctx = canvas.getContext('2d')
    
        // Background
        ctx.fillStyle = "#fff"
        ctx.roundRect(0, 0, canvas.width, canvas.height, 10)
        ctx.fill()
        ctx.fillStyle = "#111"
    
        /* title */
        ctx.font = '28px serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText(`${chord.name}`, canvas.width/2, 25);
    
        /* grid */
        for(let i = 1; i<9; i++) {
            // Vertical lines
            if(i > 1 && i < 8) {
                ctx.fillRect(((canvas.width/8)*i)-13, 70, 2, 170)
            }
        }
        // Horizontal Lines
        for(let i = 0; i<5; i++) {
            ctx.fillRect(((canvas.width/8)*2-13), 70+((170 / 4)*i), 127, 2)
        }
        // Moove point
        if(chord.moove > 0) {
            ctx.font = '20px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "top"
            ctx.fillText(`${chord.moove}`, ((canvas.width/8)*1)-15, 85)
        }
        // Numbers & dots
        keys.forEach((key, index) => {
            // Keys
            ctx.fillStyle = '#111'
            ctx.font = '20px serif';
            ctx.textAlign = "left";
            ctx.textBaseline = "top"
            ctx.fillText(`${key}`, ((canvas.width/8)*(index+2))-16, 50)
            // Dots
            if(!isNaN(key) && key>0 && key<=4) {
                ctx.fillStyle = "#111"
                ctx.beginPath();
                ctx.arc(((canvas.width/8)*index)+38, 50+((170/4)*key), 10, 0, 2 * Math.PI)
                ctx.fill();
            }
        })
        // Barre
        if(chord.barre.exist == true) {
            let start = chord.barre.from
            let end = chord.barre.to;
            ctx.roundRect((canvas.width/8)*(start), 82, (canvas.width/8)*(end-start+1), 20, 100)
            ctx.fill()
        }
    }
    let chordElement = document.createElement('div')
    let infos = document.createElement('div')
    let chordName = document.createElement('div')
    let modify = document.createElement('div')
    let deleteElement = document.createElement('div')
    let canvas = document.createElement('canvas')
    let download = document.createElement('div')

    chordElement.setAttribute('class', 'chord')
    infos.setAttribute('class', 'infos')
    chordName.setAttribute('class', 'name')
    modify.setAttribute('class', 'modify')
    deleteElement.setAttribute('class', 'delete')
    download.setAttribute('class', 'download')

    chordName.textContent = chord.name
    modify.innerHTML = `<i class="fa-solid fa-pen"></i>`
    deleteElement.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    download.innerText = "Télécharger"

    download.addEventListener('click', (e) => {
        image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = `${chord.name}.png`;
        link.href = image;
        link.click();
    })
    deleteElement.addEventListener('click', (e) => {
        removeChordFromLocalStorage(chord)
        let target = e.target.parentNode.parentNode.parentNode
        target.parentNode.removeChild(target)
    })

    chordElement.append(infos,canvas,download)
    infos.append(chordName,modify,deleteElement)


    gallery.appendChild(chordElement)
    draw(chord)
}

let gallery = document.getElementById('gallery')
function concat(chord) {
    if(chord.barre.exist == true) {
        let concated = `${chord.name}-${chord.barre.from}${chord.barre.to}${chord.moove.toString(16)}-${chord.keys}`
        return concated
    } else if(chord.barre.exist == false) {
        let concated = `${chord.name}-${chord.moove.toString(16)}-${chord.keys}`
        return concated
    }
}
function unconcat(code) {
    let splitted = code.split('-')
    if (splitted[1].length == 3) {
        return {name: splitted[0], barre:{exist: true, from: splitted[1][0], to:splitted[1][1]}, moove: parseInt(splitted[1][2], 16), keys: splitted[2]}
    } else {
        return {name: splitted[0], barre:{exist: false, from: null, to:null}, moove: parseInt(splitted[1], 16), keys: splitted[2]}
    }
}

//addChordToGallery({name: "Abmaj7", barre: {exist: false, from: 1, to: 6}, moove: 14, keys: "2x332x"})


function getChordsFromLocalStorage() {
    let storage = localStorage.getItem('chords')
    storage = JSON.parse(storage)
    return storage
}
function addChordToLocalStorage(chord) {
    let storage = getChordsFromLocalStorage() || []
    function addChord(chord) {
        storage.push(chord)
        localStorage.setItem('chords', JSON.stringify(storage))
    }
    if(storage.filter(el => el == chord).length == 0) {
        addChord(chord)
    }
}
function removeChordFromLocalStorage(chord) {
    let storage = getChordsFromLocalStorage() || []
    newStorage = storage.filter(c => c !== concat(chord))
    localStorage.setItem('chords', JSON.stringify(newStorage))
}
function displayErrorNoCards() {
    let errorButton = document.createElement('div')
    errorButton.textContent = "Ajouter un accord";
    errorButton.setAttribute('id', "errorbutton")
    gallery.append(errorButton)
}
function removeErrorNoCards() {
    let errorButton = document.getElementById('errorbutton')
    if(errorButton) errorButton.parentNode.removeChild(errorButton)
}

function changeSidebarValue(index) {
    let list = document.getElementsByClassName('menuLink')
    let element = document.getElementsByClassName('menuLink')[index-1]
    for(el of list) {
        el.classList.remove('active')
    }
    element.classList.add('active')
}

function openAddModale() {
    let modale = document.getElementById('addmodal')
    modale.classList.remove('hidden')
}
function closeAddModale() {
    let modale = document.getElementById('addmodal')
    modale.classList.add('hidden')
}

function modalPreview(chord) {
    let canvas = document.getElementById('preview')

    let keys = chord.keys.split('')
    canvas.height = 600
    canvas.width = 400
    let ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = "#fff"
    ctx.roundRect(0, 0, canvas.width, canvas.height, 10)
    ctx.fill()
    ctx.fillStyle = "#111"

    /* title */
    ctx.font = '38px serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    ctx.fillText(`${chord.name}`, canvas.width/2, 45);

    /* grid */
    for(let i = 1; i<9; i++) {
        // Vertical lines
        if(i > 1 && i < 8) {
            ctx.fillRect(((canvas.width/8)*i)-13, 120, 2, 450)
        }
    }
    // Horizontal Lines
    for(let i = 0; i<5; i++) {
        ctx.fillRect(((canvas.width/8)*2-13), 120+((450 / 4)*i), 252, 2)
    }
    // Moove point
    if(chord.moove > 0) {
        ctx.font = '20px serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "top"
        ctx.fillText(`${chord.moove}`, ((canvas.width/8)*1)-15, 160)
    }
    // Numbers & dots
    keys.forEach((key, index) => {
        // Keys
        ctx.fillStyle = '#111'
        ctx.font = '20px serif';
        ctx.textAlign = "left";
        ctx.textBaseline = "top"
        ctx.fillText(`${key}`, ((canvas.width/8)*(index+2))-16, 80)
        // Dots
        if(!isNaN(key) && key>0 && key<=4) {
            ctx.fillStyle = "#111"
            ctx.beginPath();
            ctx.arc(((canvas.width/8)*index)+88, 65+((450/4)*key), 15, 0, 2 * Math.PI)
            ctx.fill();
        }
    })
    // Barre
    if(chord.barre.exist == true) {
        let start = chord.barre.from
        let end = chord.barre.to;
        ctx.roundRect(((canvas.width/8)*(start))+13, 160, (canvas.width/8)*(end-start+1), 25, 100)
        ctx.fill()
    }


    //console.log(canvas,chord)
}

function generateCode() {
    let storage = getChordsFromLocalStorage()
    let str = storage.join("+")
    return str
}
generateCode()




modalPreview({name: "Nom de l'accord", barre: {exist: false, from: 1, to: 6}, moove: 0, keys: 'xxxxxx'})

let previewChord = {name: "Nom de l'accord", barre: {exist: false, from: 1, to: 6}, moove: 0, keys: "000000"}

let form = document.getElementsByTagName('form')[0]
let formName = form.getElementsByClassName('name')[0]
let numbersWrapper = form.getElementsByClassName('numbers')[0].children
let barreStatus = form.getElementsByClassName('barre')[0].children[0].getElementsByTagName('input')[0]
let barreStart = form.getElementsByClassName('barre')[0].children[1].getElementsByTagName('input')[0]
let barreEnd = form.getElementsByClassName('barre')[0].children[3].getElementsByTagName('input')[0]
let mooveNumber = form.getElementsByClassName('moove')[0].getElementsByTagName('input')[0]
let submitButton = form.getElementsByClassName('submit')[0]

formName.addEventListener('input', (e) => {
    if(e.target.value == "") {
        previewChord.name = "Nom de l'accord"
    } else {
        previewChord.name = e.target.value
    }
    modalPreview(previewChord)
})
let i = 0;
for(let input of numbersWrapper) {
    let index = i
    i++
    input.addEventListener('input', (e) => {
        if(e.target.value == "") {
            previewChord.keys = previewChord.keys.replaceAt(index, "x")
        } else {
            previewChord.keys = previewChord.keys.replaceAt(index, e.target.value)
        }
        modalPreview(previewChord)
    })
}
mooveNumber.addEventListener('input', (e) => {
    if(e.target.value == "") {
        previewChord.moove = 0
    } else {
        previewChord.moove = e.target.value
    }
    modalPreview(previewChord)
})
barreStatus.addEventListener('input', (e) => {
    let status = barreStatus.checked
    previewChord.barre.exist = status
    if(previewChord.barre.from == null) {
        previewChord.barre.from = 1
    }
    if(previewChord.barre.to == null) {
        previewChord.barre.to = 6
    }
    modalPreview(previewChord)
})

barreStart.addEventListener('input', (e) => {
    previewChord.barre.from = e.target.value
    modalPreview(previewChord)
})
barreEnd.addEventListener('input', (e) => {
    previewChord.barre.to = e.target.value
    modalPreview(previewChord)
})

submitButton.addEventListener('click', (e) => {
    console.log(previewChord)
    addChordToGallery(previewChord)
    addChordToLocalStorage(concat(previewChord))
    removeErrorNoCards()
    closeAddModale()
    changeSidebarValue(1)
})




if(getChordsFromLocalStorage().length > 0) {
    getChordsFromLocalStorage().forEach(el => {
        let unconcated = unconcat(el)
        addChordToGallery(unconcated)
    })
} else {
    
    displayErrorNoCards()
}

let errorButtonElement = document.getElementById('errorbutton')
let addButton = document.getElementById('addChordMenu')
let seeGalleryMenu = document.getElementById('seeGalleryMenu')
let share = document.getElementById('share')
let seeShared = document.getElementById('seeShared')

if(errorButtonElement) {
    errorButtonElement.addEventListener('click', (e) => {
        openAddModale()
        changeSidebarValue(2)
    })
}

addButton.addEventListener('click', (e) => {
    openAddModale()
    changeSidebarValue(2)
})

seeGalleryMenu.addEventListener('click', (e) => {
    closeAddModale()
    changeSidebarValue(1)
})

share.addEventListener('click', (e) => {
    let tag = document.getElementById('copyTag')
    tag.classList.add('fadeIn')
    tag.classList.remove('fadeOut')
    setTimeout(() => {tag.classList.add('fadeOut'); tag.classList.remove('fadeIn')}, 5000)
})
seeShared.addEventListener('click', (e) => {
    changeSidebarValue(4)
})
//openAddModale()