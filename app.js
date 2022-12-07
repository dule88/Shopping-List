const dodavanjeElement = document.querySelector('.dodavanje');
const namirnicaElement = document.querySelector('.namirnica');
const listaNamirnicaElement = document.querySelector('.lista-namirnica-body');
const manjeElement = document.querySelector('.manje');
const viseElement = document.querySelector('.vise');
const trenutnaStranicaElement = document.querySelector('.trenutna-stranica');


const lista = [];

let stranica = 1;
let maxStr; 

window.onload = () => {
    
    // Paginacija
    lista.length % 6 === 0 ? maxStr = lista.length / 6 : maxStr = Math.floor(lista.length / 6) + 1;
    console.log(maxStr);
    ispis();
};

//Funkcija za dodavanje namirnica
const ispis = () => {

    listaNamirnicaElement.innerHTML = '';

    loadFirstSix(lista, stranica, 6).forEach((element, idx) => {
        listaNamirnicaElement.innerHTML += `
        <tr>
            <td>${element}</td>
            <td><button class="btn btn-danger brisanje-${idx}" onClick="brisanjeSloga(event)">X</button></td>
         </tr>
        `
    });
    // paginacija
    lista.length % 6 === 0 ? maxStr = lista.length / 6 : maxStr = Math.floor(lista.length / 6) + 1;

    trenutnaStranicaElement.value = stranica;
}

// Event listener koji dodaje elemente
dodavanjeElement.addEventListener('click', () => {
    if (namirnicaElement.value !== '') {
        lista.push(namirnicaElement.value);
    }

    namirnicaElement.value = '';
    namirnicaElement.focus();

    ispis();

});

// Funkcija koja brise elemente
const brisanjeSloga = (event) => {

    let klasa = event.target.className;
    let idx = klasa.split(' ').slice(-1)[0].split('-')[1];
    console.log(idx);

    lista.splice(idx, 1);

    ispis();
}

// strelica levo koja vraca stranicu unazad
manjeElement.addEventListener('click', () => { 
    stranica <= 1 ? stranica = 1 : stranica -= 1;
    ispis();
})

// strelica desno koja vodi na narednu stranicu
viseElement.addEventListener('click', () => { 
    stranica >= maxStr ? stranica = maxStr : stranica += 1;
    ispis();
})

// prikaz trenutne strane
const loadFirstSix = (listaElemenata, trenutnaStrana, brElemenataNaStrani) => {

    let idxPrvogElementa = (trenutnaStrana - 1) * brElemenataNaStrani;

    return listaElemenata.filter((element, idx) => {
        if(idx >= idxPrvogElementa && idx < idxPrvogElementa + brElemenataNaStrani){
            return element;
        };
    });

}