window.onload = init

function init() {

    document.getElementById("save").addEventListener("click", saveLocalStorage)
    document.getElementById("clarte").addEventListener("change", modificationApercuCouleur)
    document.getElementById("color").addEventListener("change", modificationApercuCouleur)

    miseAJourSelectedOptions()
    traitementInfosGenerales()
    modificationApercuCouleur()
    affichageCouleurDeFonds()
}

function saveLocalStorage() {

    localStorage.setItem("clarte", clarte.value)
    localStorage.setItem("color", color.value)
    localStorage.setItem("liste", liste.checked)
    localStorage.setItem("cartes", cartes.checked)
}

function miseAJourSelectedOptions() {

    const clarte = document.getElementById("clarte")
    const color = document.getElementById("color")
    const liste = document.getElementById("liste")
    const cartes = document.getElementById("cartes")

    if (localStorage.getItem("clarte"))
        clarte.value = localStorage.getItem("clarte")
    if (localStorage.getItem("color"))
        color.value = localStorage.getItem("color")

    if (localStorage.getItem("liste") === "true")
        liste.checked = true
    if (localStorage.getItem("cartes") === "true")
        cartes.checked = true

    if (color.value === "white") {
        clarte.value = "light"
        clarte.disabled = true
    }

    color.addEventListener("change", () => {
        if (color.value === "white") {
            clarte.value = "light"
            clarte.disabled = true
        } else if (color.value === "black") {
            clarte.value = "dark"
            clarte.disabled = true
        } else
            clarte.disabled = false
    })

}

function modificationApercuCouleur() {

    const apercu = document.getElementById("apercu_couleur")
    const clarte = document.getElementById("clarte")
    const color = document.getElementById("color")
    const valeurLight = "-200"
    const valeurDark = "-600"

    apercu.className = apercu.className.replace(/\bbg-\S+/g, "")
    apercu.classList.add("bg-"+ color.value + (color.value === "white" || color.value === "black" ? "": clarte.value === "light" ? valeurLight : valeurDark))
}

function affichageCouleurDeFonds() {

    const corps = document.querySelector("body")
    const couleurTitre = document.getElementById("titre")
    const head = document.getElementById("head")

    corps.className = corps.className.replace(/\bbg-\S+/g, "")
    corps.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte")))

    if (localStorage.getItem("color") === "black" || localStorage.getItem("clarte") === "dark") {
        couleurTitre.classList.add("text-white")
    }

    head.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte"), 100))
}


// construction du nom de la class bootstrap pour un "bg-color-clarte" (ex : bg-cyan-200)
function classColorString(color, clarte, offset = 0) {

    const valeurLight = 200
    const valeurDark = 600

    return "bg-"+ color + (color === "white" || color === "black" ? "" : clarte === "light" ? "-"+(valeurLight+offset) : "-"+(valeurDark-2*offset) )
}

function traitementInfosGenerales() {

    const promo = document.getElementById("promo")
    const session = document.getElementById("session")

    fetch("promo.json")
        .then(response => response.json())
        .then(data => {
            promo.innerText = data.nom_promo;
            session.innerText = data.date_debut_formation.slice(-5);
        })
        .catch(error => {
            console.error("Une erreur s'est produite:", error);
        })
}



