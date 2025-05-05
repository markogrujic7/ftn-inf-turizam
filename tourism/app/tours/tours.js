'use strict'

class Tura {
    constructor(naziv, opis, duzina, tagovi){
        this.naziv = naziv
        this.opis = opis
        this.duzina = duzina
        this.tagovi = tagovi
    }
}

let ture = []

function createTable() {
    let div = document.querySelector(".container")

    let table = document.createElement("table")
    table.setAttribute("id", "prikazSvih")
    table.style.marginRight = "2vh"
    

    let thead = document.createElement("thead")
    thead.style.backgroundColor = "cornflowerblue"

    let tbody = document.createElement("tbody")
    tbody.style.backgroundColor = "lightblue"

    let trH = document.createElement("tr")

    let nazivH = document.createElement("th")
    let duzinaH = document.createElement("th")

    nazivH.textContent = "Naziv ture"
    duzinaH.textContent = "Duzina ture(km)"

    trH.appendChild(nazivH)
    trH.appendChild(duzinaH)
    thead.appendChild(trH)
    table.appendChild(thead)
    table.appendChild(tbody)

    div.insertBefore(table, div.firstChild)
}

function createRowsTura() {
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ""

    for (let i = 0; i < ture.length; i++) {
        let tr = document.createElement("tr")
      
        let naziv = document.createElement("td")
        let duzina = document.createElement("td")
    
        naziv.textContent = ture[i].naziv
        duzina.textContent = ture[i].duzina
      
        tr.appendChild(naziv)
        tr.appendChild(duzina)
        tr.addEventListener('click', function() {
            displayDetailsTura(ture[i])
        })
        tbody.appendChild(tr)
    }
}

function initializeDataTura(){
    if (localStorage.ture) {
        ture = JSON.parse(localStorage.ture)
        createTable()
        createRowsTura()
    }

    handleFormSubmission()
}

function displayDetailsTura(tura) {
    let p = document.createElement("p")
    p.style.margin = "0"

    p.innerHTML = "Naziv: " + tura.naziv + "<br>" + "<br>" + "Opis: " + tura.opis + "<br>" + "<br>" + "Duzina: " + tura.duzina + "km" + "<br>" + "<br>" + "Tagovi: "
    for (let i = 0; i < tura.tagovi.length; i++) {
        const tag = tura.tagovi[i];
        if (i + 1 == tura.tagovi.length){
            p.innerHTML += tag
        }
        else {
            p.innerHTML += tag + ", "
        }
    }
    if (!document.querySelector("#turaDetails")) {
        let detalji = document.createElement("div")
        detalji.setAttribute("id", "turaDetails")

        let body = document.querySelector("body")
        body.appendChild(detalji)
    }
    
    let detalji = document.querySelector("#turaDetails")
    detalji.style.backgroundColor = "rgb(67, 184, 125)"
    detalji.style.marginTop = "5vh"
    detalji.style.padding = "1vh"
    detalji.style.border = "1px solid black"
    detalji.style.width = "fit-content"
    if (detalji.firstChild) {
        detalji.firstChild.remove()
    }
  
    detalji.appendChild(p)
}


function handleFormSubmission() {
    let submitBtn = document.querySelector('#submitBtn')
    submitBtn.addEventListener('click', function() {
        if (!document.querySelector("#prikazSvih")){
            createTable()
        }

        const forma = document.querySelector('#forma')
        const formData = new FormData(forma)
  
        const naziv = formData.get('naziv')
        const opis = formData.get('opis')
        const duzina = formData.get('duzina')
        const tagoviString = formData.get('tagovi')

        if (naziv === (null || "") || opis === (null || "") || duzina === (null || 0 || NaN || "") || tagoviString === (null || ""))
        {
            alert("Unesi sva polja !!!")
            return
        }

        let tagovi = tagoviString.split(", ")
  
        const newTour = new Tura(naziv, opis, duzina, tagovi)
        ture.push(newTour)

        localStorage.ture = JSON.stringify(ture)

        createRowsTura()
    })
}

document.addEventListener('DOMContentLoaded', initializeDataTura)
