function getToggleMode() {
    let toggleModeElement = document.createElement('div')
    toggleModeElement.classList = 'comp toggle-mode fr'

    let darkButton = document.createElement('div')
    darkButton.classList = "dark selectable fr active"
    darkButton.setAttribute('tabindex', "0")
    darkButton.innerHTML =  `<i class="fa-solid fa-moon"></i>`

    let lightButton = document.createElement('div')
    lightButton.classList = "light selectable fr"
    lightButton.setAttribute('tabindex', "0")
    lightButton.innerHTML =  `<i class="fa-solid fa-sun"></i>`

    toggleModeElement.append(darkButton,lightButton)

    let mode = "dark"

    lightButton.addEventListener('click', (e) => {
        mode = "light"
        refresh()
    })
    darkButton.addEventListener('click', (e) => {
        mode = "dark"
        refresh()
    })
    function refresh() {
        let app = document.getElementById('app')
        switch(mode) {
            case "dark":
                app.classList.remove('lightmode')
                app.classList.add('darkmode')
                darkButton.classList.add('active')
                lightButton.classList.remove('active')
                break;
            case "light":
                app.classList.add('lightmode')
                app.classList.remove('darkmode')
                lightButton.classList.add('active')
                darkButton.classList.remove('active')
                break;
        }
    }
    return toggleModeElement;
}