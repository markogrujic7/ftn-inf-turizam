'use strict';

class Restoran {
    constructor(naziv, opis, tip) {
        this.naziv = naziv;
        this.opis = opis;
        this.tip = tip;
    }
}

function ucitajRestorane() {
    const sacuvaniRestorani = localStorage.getItem('restorani');
    if (sacuvaniRestorani) {
        const parsedRestorani = JSON.parse(sacuvaniRestorani);
        return parsedRestorani.map(rest => new Restoran(rest.naziv, rest.opis, rest.tip));
    }
    return [
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
}

let restorani = ucitajRestorane();

const tbody = document.getElementById('tabela-body');
const detalji = document.getElementById('detalji');

function sacuvajRestorane() {
    localStorage.setItem('restorani', JSON.stringify(restorani));
}

function prikaziTabelu() {
    tbody.innerHTML = '';
    
    restorani.forEach((restoran, index) => {
        const tr = document.createElement('tr');
        
        const naziv = document.createElement('td');
        const opis = document.createElement('td');

        naziv.textContent = restoran.naziv;
        opis.textContent = restoran.opis;

        tr.appendChild(naziv);
        tr.append(opis);

        tr.addEventListener('click', () => prikaziDetalje(restoran));
        tbody.appendChild(tr);        
    });
}

function prikaziDetalje(restoran) {
    document.querySelector('.detalji-naziv').textContent = `Naziv: ${restoran.naziv}`;
    document.querySelector('.detalji-tip').textContent = `Tip: ${restoran.tip.join(", ")}`;
    document.querySelector('.detalji-opis').textContent = `Opis: ${restoran.opis}`;
}

function dodajRestoran(naziv, opis, tip) {
    const noviRestoran = new Restoran(naziv, opis, tip);
    restorani.push(noviRestoran);
    sacuvajRestorane(); 
    prikaziTabelu(); 
}

document.querySelector('.forma').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const naziv = document.querySelector('.input-naziv').value;
    const opis = document.querySelector('.input-opis').value;
    const tipovi = document.querySelector('.input-tipovi').value
    const tip = tipovi.split(',').map(tip => tip.trim()).filter(tip => tip !== '');
    
    dodajRestoran(naziv, opis, tip);   
    this.reset();
});

prikaziTabelu();