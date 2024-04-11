window.onload = init

function init() {

    traitementInfosGenerales()
    affichageCouleurDeFonds()
    affichageCarte()
}

function affichageCouleurDeFonds() {

    const corps = document.querySelector("body")
    // const titre = document.getElementById("titre")
    const head = document.getElementById("head")

    corps.className = corps.className.replace(/\bbg-\S+/g, "")
    corps.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte")))

    // if (localStorage.getItem("color") === "black" || localStorage.getItem("clarte") === "dark") {
    //     titre.classList.add("text-white")
    // }

    head.classList.add(classColorString(localStorage.getItem("color"), localStorage.getItem("clarte"), 100))
}

// construction du nom de la class bootstrap pour un "bg-color-clarte" (ex : bg-cyan-200)

function classColorString(color, clarte, offset = 0) {

    const valeurLight = 200
    const valeurDark = 600

    return "bg-"+ color + (color === "white" || color === "black" ? "" : clarte === "light" ? "-"+(valeurLight+offset) : "-"+(valeurDark-2*offset) )
}

function affichageCarte() {
    let marker
    let map = L.map('map').setView([46.50, 2.5], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    fetch("promo.json")
        .then(response => response.json())
        .then(data => {
            // console.log(data.apprenants[0].coordonnees.)
            data.apprenants.forEach(info => {

                //ajouterMarqueur
                if (info.coordonnees) {
                    marker = L.marker([parseFloat(info.coordonnees.latitude), parseFloat(info.coordonnees.longitude)]).addTo(map);
                    marker.bindPopup(
                        "<img src="+info.avatar+" style='width: 60px; height: 60px; margin-bottom: 10px'><br>" +
                        "<b>Nom : </b>"+info.nom+"<br>" +
                        "<b>Prénom : </b>"+info.prenom+"</br>" +
                        "<b>Ville : </b>"+info.ville
                    )
                        .openPopup();
                }
            })

            map.setView([46.50, 2.5], (window.innerWidth >= 992 ? 6 : window.innerWidth >= 385 ? 5 : 4));
            window.addEventListener('resize', () => {
                map.setView([46.50, 2.5], (window.innerWidth >= 992 ? 6 : window.innerWidth >= 385 ? 5 : 4));
            })

        })
        .catch(error => {
            console.error("Une erreur s'est produite:", error);
        })

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