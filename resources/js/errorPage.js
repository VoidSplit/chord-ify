/*
<div id="error-404">
    <div class="inner">
        <h1>Erreur 404</h1>
        <p>Il semblerait que vous avez fait une fausse note !</p>
        <div class="buttons">
            <a href="#">Retrouver sa guitare</a>
        </div>
    </div>
</div>
*/
function create404Page() {
    let wrapper = document.createElement('div')
    let inner = document.createElement('div')
    let h1 = document.createElement('h1')
    let p = document.createElement('p')
    let buttons = document.createElement('div')
    let link = document.createElement('a')

    wrapper.setAttribute('id', "error-404")

    inner.setAttribute('class', "inner")
    buttons.setAttribute('class', "buttons")
    link.setAttribute('href', "#")

    h1.textContent = "Erreur 404";
    p.textContent = "Il semblerait que vous avez fait une fausse note !"
    link.textContent = "Retourner à la page d'accueil"

    wrapper.appendChild(inner)
    inner.append(h1,p,buttons)
    buttons.appendChild(link)

    return wrapper
}