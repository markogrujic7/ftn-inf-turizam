'use strict';

class Restoran {
    constructor(naziv, opis, tip) {
        this.naziv = naziv;
        this.opis = opis;
        this.tip = tip;
    }
}

const restorani = [
    new Restoran(
        "Italijanski kutak", 
        "Autentični ukusi Italije u centru grada", 
        ["Italijanska"]
    ),
    new Restoran(
        "Azijski raj", 
        "Eksplozija azijskih aroma i ukusa", 
        ["Azijska", "Indonezijska"]
    ),
    new Restoran(
        "Gurmanova oaza", 
        "Tradicionalni balkanski specijaliteti", 
        ["Srpska", "Balkanska"]
    ),
];

const tbody = document.getElementById('tabela-body');
const detalji = document.getElementById('detalji');

function prikaziTabelu() {
    tbody.innerHTML = '';
    
    restorani.forEach((restoran, index) => {
        const tr = document.createElement('tr');
        
        const br = document.createElement('td');
        const naziv = document.createElement('td');
        const opis = document.createElement('td');

        br.textContent = index + 1;
        naziv.textContent = restoran.naziv;
        opis.textContent = restoran.opis;

        tr.appendChild(naziv)
        tr.append(opis)

        tr.addEventListener('click', () => prikaziDetalje(restoran));
        tbody.appendChild(tr);        
    });
}

function prikaziDetalje(restoran) {
    document.querySelector('.detalji-naziv').textContent = `Naziv: ${restoran.naziv}`;
    document.querySelector('.detalji-tip').textContent = `Tip: ${restoran.tip.join(", ")}`;
    document.querySelector('.detalji-opis').textContent = `Opis: ${restoran.opis}`;
}

prikaziTabelu();