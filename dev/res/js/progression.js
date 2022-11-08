const keys = [
    { key: "C", tags: ["Do", "C", "Do majeur", "majeur"] },
    { key: "D", tags: ["Ré", "D", "Ré majeur", "majeur"] },
    { key: "E", tags: ["Mi", "E", "Mi majeur", "majeur"] },
    { key: "F", tags: ["Fa", "F", "Fa majeur", "majeur"] },
    { key: "G", tags: ["Sol", "G", "Sol majeur", "majeur"] },
    { key: "A", tags: ["La", "A", "La majeur", "majeur"] },
    { key: "B", tags: ["Si", "B", "Si majeur", "majeur"] },
    { key: "Cm", tags: ["Dom", "Cm", "Do mineur", "mineur", "Do" ] },
    { key: "Dm", tags: ["Rém", "Dm", "Ré mineur", "mineur", "Ré" ] },
    { key: "Em", tags: ["Mim", "Em", "Mi mineur", "mineur", "Mi" ] },
    { key: "Fm", tags: ["Fam", "Fm", "Fa mineur", "mineur", "Fa" ] },
    { key: "Gm", tags: ["Solm", "Gm", "Sol mineur", "mineur", "Sol" ] },
    { key: "Am", tags: ["Lam", "Am", "La mineur", "mineur", "La" ] },
    { key: "Bm", tags: ["Sim", "Bm", "Si mineur", "mineur", "Si" ] },
    { key: "C#m", tags: ["Dom", "C#m", "Do dièse mineur", "Do diese mineur", "Do diése mineur", "mineur"] },
    { key: "Db", tags: ["Réb", "Db", "Ré bémol", "Ré bèmol", "Ré bemol", "Ré bémol majeur", "Ré bèmol majeur", "Ré bemol majeur", "majeur"] },
    { key: "Eb", tags: ["Mib", "Eb", "Mi bémol", "Mi bèmol", "Mi bemol", "Mi bémol majeur", "Mi bèmol majeur", "Mi bemol majeur", "majeur"] },
    { key: "Ebm", tags: ["Mibm", "Ebm", "Mi bémol mineur", "Mi bèmol mineur", "Mi bemol mineur", "mineur"] },
    { key: "F#", tags: ["Fa#", "F#", "Fa dièse majeur", "Fa diése majeur", "Fa diese majeur", "majeur"] },
    { key: "F#m", tags: ["Fa#m", "F#m", "Fa dièse mineur", "Fa diése mineur", "Fa diese mineur", "mineur"] },
    { key: "G#m", tags: ["Sol#m", "G#m", "Sol dièse mineur", "Sol diése mineur", "Sol diese mineur", "mineur"] },
    { key: "Ab", tags: ["Lab", "Ab", "La bémol", "La bèmol", "La bemol", "La bémol majeur", "La bèmol majeur", "La bemol majeur", "majeur"],  },
    { key: "Bbm", tags: ["Sibm", "Bbm", "Si bémol mineur", "Si bèmol mineur", "Si bemol mineur", "mineur"] }
]
const dropdownList = document.getElementById("dropdownList")
const dropdown = document.getElementsByClassName('dropdown')[0]
const dropdownInput = dropdown.getElementsByTagName('input')[0]
const generateButton = document.getElementById("generate")


const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
const displayDropdown = (list) => {
    dropdownList.innerHTML = ``
    list.forEach(element => {
        let li = document.createElement('li')
        li.textContent = element.key

        li.addEventListener('click', (e) => {
            let value = e.target.textContent
            dropdownInput.value = value
        })
        dropdownList.append(li)
    });
    if(list.length == 0) {
        let li = document.createElement('li')
        li.textContent = "Aucun element ne correspond à votre recherche.."
        li.classList.add('error')
        dropdownList.append(li)
    }
}
const search = (list, parameters) => {
    let temporaryList = []
    list.forEach(key => {
        if(key.tags.filter(el => el.toLowerCase().includes(parameters)).length > 0) {
            temporaryList.push(key)
        } 
    })
    return temporaryList
}
const chordList = sortByKey(keys, "key")



displayDropdown(chordList)



document.addEventListener('click', (e) => {
    if(e.target != dropdownInput) {
        // click outside
        dropdown.removeAttribute('data-opened')
  
        let valid = false
        chordList.forEach(el => {
          if(el.key == dropdownInput.value) return valid = true
        })
        if(valid == false && dropdownInput.value !== "") {
          dropdown.setAttribute("data-error", '')
        } else {
          dropdown.removeAttribute("data-error")
        }
    } else {
        // click inside
        dropdown.setAttribute('data-opened', '')
        dropdown.removeAttribute("data-error")
    } 
  })
  
generateButton.addEventListener('click', (e) => {
    if(dropdown.getAttribute('data-error') !== "" && dropdownInput.value !== "") {
        let value = dropdownInput.value

        let generated = generate(value)
        // Génerer le taleau
        let table = document.getElementById("table")
        table.innerHTML = ""
        generated.progressions.forEach(prog => {
            let line = document.createElement("div")
            line.classList = "line"
            line.innerHTML = `
            <div class="left">${generated.fondamentale}</div>
            <div class="right">
                <span>${prog[0]}</span>
                <span>${prog[1]}</span>
                <span>${prog[2]}</span>
                <span>${prog[3]}</span>
            </div>
            `
            table.append(line)
        })
    }
})
dropdownInput.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase()
    displayDropdown(search(chordList, value))
})