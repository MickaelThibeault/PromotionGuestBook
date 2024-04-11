window.onload = init

function init() {

    traitementInfosGenerales()
    affichageCouleurDeFonds()
}

function affichageCouleurDeFonds() {

    const corps = document.querySelector("body")
    const titre = document.getElementById("titre")
    const infosGenerales = document.getElementById("infosGenerales")
    const head = document.getElementById("head")

    corps.className = corps.className.replace(/\bbg-\S+/g, "")
    corps.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte")))

    if (localStorage.getItem("color") === "black" || localStorage.getItem("clarte") === "dark") {
        titre.classList.add("text-white")
        infosGenerales.classList.add("text-white")
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
    const debut = document.getElementById("debut")
    const fin = document.getElementById("fin")
    const nbEtudiants = document.getElementById("nbEtudiants")
    const description = document.getElementById("description")
    const liens = document.getElementById("liens")


    fetch("promo.json")
        .then(response => response.json())
        .then(data => {
            promo.innerText = data.nom_promo;
            session.innerText = data.date_debut_formation.slice(-5);
            debut.innerText = formaterDate(data.date_debut_formation);
            fin.innerText = formaterDate(data.date_fin_formation);
            nbEtudiants.innerText = data.nombre_apprenants
            description.innerHTML = data.description_formation
            liens.innerHTML = data.liens_utiles_formation
        })
        .catch(error => {
            console.error("Une erreur s'est produite:", error);
        })
}

function formaterDate(date) {

    let [annee, mois, jour] = date.split("-")

    return jour+'/'+mois+'/'+annee
}