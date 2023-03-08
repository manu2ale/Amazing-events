const cardContainer = document.getElementById("card-container");


// Create upcoming events array
let pastEvents = [];
let currentDate = new Date(data.currentDate);
data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event);
    };
});


// Crea todas las cards de Upcoming Events
function createPastEventsCards() {
    let htmlEvents = "";
    let currentDate = new Date(data.currentDate);
    for (let event of data.events) {
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            htmlEvents += createCard(event);
        };
    };
    cardContainer.innerHTML = htmlEvents;
};
createPastEventsCards();


// Crear e insertar checkbox de categorias
insertCheckbox();


// Busqueda con ambos filtros
function bothFiltersSearch(checkeados, keyWord, htmlEvents) {
    for(let elemento of checkeados) {
        pastEvents.filter(evento => (elemento == evento.category) && ((evento.name.toLowerCase().includes(keyWord)) || (evento.description.toLowerCase().includes(keyWord))) ).forEach(evento => { htmlEvents += createCard(evento) });
    };
    htmlEvents.length == 0 ? nothingFound(keyWord) : cardContainer.innerHTML = htmlEvents;
};


// Filtrar por checkbox seleccionados
const homeChecks = document.querySelectorAll(".form-check-input");
for (let check of homeChecks) {
    check.addEventListener('change', () => {
        let checkeados = [];
        for (let chk of homeChecks) {
            if (chk.checked) {
                checkeados.push(chk.value)
            };
        };

        let keyWord = searchInput.value.toLowerCase().trim();
        let htmlEvents = "";
        if ( (checkeados.length > 0) && (keyWord == "") ) {
            for(let elemento of checkeados) {
                pastEvents.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += createCard(evento) });
                cardContainer.innerHTML = htmlEvents;
            };
        } else if ( (checkeados.length > 0) && (keyWord != "") ) {
            bothFiltersSearch(checkeados, keyWord, htmlEvents);            
        } else {
            createPastEventsCards();
            
        };
    });
};



// Realizo la busqueda por el searchInput
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let htmlEvents = "";
    let result = false;
    let keyWord = searchInput.value.toLowerCase().trim();
    
    let checkeados = [];
    for (let chk of homeChecks) {
        if (chk.checked) {
            checkeados.push(chk.value)
        };
    };
    
    if ((keyWord != "") && (checkeados.length == 0)) {
        pastEvents.forEach(event => {
            if ( (event.name.toLowerCase().includes(keyWord)) || (event.description.toLowerCase().includes(keyWord)) ) {
                htmlEvents += createCard(event);
                result = true;
            }
        });
        if (result) {
            cardContainer.innerHTML = htmlEvents;
        } else {
            nothingFound(keyWord);
        };
    } else if ((keyWord != "") && (checkeados.length > 0)){
        bothFiltersSearch(checkeados, keyWord, htmlEvents);
    } else {
        createPastEventsCards();
    };
});