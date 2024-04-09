window.onload = init

function init() {

    const liste = document.getElementById("liste")
    const cartes = document.getElementById("cartes")

    if (localStorage.getItem("liste") === "true")
        liste.checked = true
    if (localStorage.getItem("cartes") === "true")
        cartes.checked = true

    displayAffichage()
    liste.addEventListener("change", displayAffichage)
    cartes.addEventListener("change", displayAffichage)

    affichageCouleurDeFonds()
    traitementDonneesApprenants()
    traitementInfosGenerales()
    construireModal()
}



function displayAffichage() {

    const liste = document.getElementById("liste")
    const cartes = document.getElementById("cartes")
    const listing = document.getElementById("listing")
    const cards = document.getElementById("cards")

    if (liste.checked === true) {
        listing.style.display = "block"
        cards.style.display = "none"
    } else if (cartes.checked === true) {
        listing.style.display = "none"
        cards.style.display = "block"
    }
}

function traitementDonneesApprenants() {

    fetch("promo.json")
        .then(response => response.json())
        .then(data => {
            // console.log(data.apprenants[0].nom)
            data.apprenants.forEach(info => {
                ajouterLigneTableau(info)
                ajouterCard(info)
            })
        })
        .catch(error => {
            console.error("Une erreur s'est produite:", error);
        })
}

function ajouterLigneTableau(info) {

    const tbody = document.querySelector("tbody")
    const template = document.getElementById("ligneTableau")
    const ligneTableau = template.content.cloneNode(true)

    ligneTableau.querySelector("tr td:first-child").innerText = info.nom
    ligneTableau.querySelector("tr td:nth-child(2)").innerText = info.prenom
    ligneTableau.querySelector("tr td:nth-child(3)").innerText = info.ville
    ligneTableau.querySelector("button").setAttribute("data-bs-infos", JSON.stringify(info))

    tbody.appendChild(ligneTableau)
}

function ajouterCard(info) {

    const divParent = document.getElementById("card")
    const template = document.getElementById("cardType")
    const card = template.content.cloneNode(true)

    card.querySelector("li:first-child p").innerText = info.nom
    card.querySelector("li:nth-child(2) p").innerText = info.prenom
    card.querySelector("li:nth-child(3) p").innerText = info.ville
    card.querySelector("button").setAttribute("data-bs-infos", JSON.stringify(info))

    divParent.appendChild(card)
}

function affichageCouleurDeFonds() {

    const corps = document.querySelector("body")
    const typeAffichage = document.getElementById("typeAffichage")
    const titre = document.getElementById("titre")
    const head = document.getElementById("head")

    corps.className = corps.className.replace(/\bbg-\S+/g, "")
    corps.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte")))

    if (localStorage.getItem("color") === "black" || localStorage.getItem("clarte") === "dark") {
        //typeAffichage.className = typeAffichage.className.replace(/\btext-\S+/g, "")
        typeAffichage.classList.add("text-white")
        titre.classList.add("text-white")
    }

    head.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte"), 100))
}

function classColorString(color, clarte, offset = 0) {

    const valeurLight = 200
    const valeurDark = 600

    return "bg-"+ color + (color === "white" || color === "black" ? "" : clarte === "light" ? "-"+(valeurLight+offset) : "-"+(valeurDark-2*offset) )
}

function construireModal() {

    const modal = document.getElementById('modal')

    if (modal) {
        modal.addEventListener('show.bs.modal', event => {

            const button = event.relatedTarget
            const infos = JSON.parse(button.getAttribute('data-bs-infos'))
            const image = modal.querySelector('img')
            const elementsFiche = modal.querySelectorAll(".modal-body span")

            image.setAttribute("src", infos.avatar)
            elementsFiche[0].innerText = infos.nom
            elementsFiche[1].innerText = infos.prenom
            elementsFiche[2].innerText = infos.ville
            elementsFiche[3].innerText = infos.passions
            elementsFiche[4].innerText = infos.anecdotes
        })
    }
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