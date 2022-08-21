function init() {
    displayElementTo(getSidebar(), document.getElementById('app'))
    displayElementTo(testPage(), document.getElementById('app'))
}
function displayElementTo(element, parent)  {
    parent.appendChild(element)
}
init()

function testPage() {
    let page = document.createElement('div')
    page.classList = "section fc"
    page.innerHTML = `
    <nav class="gallery-navigation fr">
        <div class="search-bar">
            <input type="text" placeholder="Rechercher..">
        </div>
        <div class="add-group">
            <div class="btn" tabindex="0">Ajouter un groupe</div>
        </div>
    </nav>
    <div class="group fc" tabindex="0">
        <div class="top fr">
            <p>Groupe 1</p>
            <div class="actions fr">
                <div class="close">
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div class="fullscreen">
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
                <div class="open">
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div class="fullscreen">
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