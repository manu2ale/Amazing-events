const cardContainer = document.getElementById("card-container");

// Create upcoming events array
let upcomingEvents = [];
let currentDate = new Date(data.currentDate);
data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
       upcomingEvents.push(event);
    };
});


// Crea todas las cards de Upcoming Events
function createUpcomingEventsCards() {
    let htmlEvents = "";
    let currentDate = new Date(data.currentDate);
    for (let event of data.events) {
        let eventDate = new Date(event.date);
        if (eventDate > currentDate) {
            htmlEvents += createCard(event);
        };
    };
    cardContainer.innerHTML = htmlEvents;
};
createUpcomingEventsCards();


// Crear e insertar checkbox de categorias
insertCheckbox();


// Busqueda con ambos filtros
function bothFiltersSearch(checkeados, keyWord, htmlEvents) {
    for(let elemento of checkeados) {
        upcomingEvents.filter(evento => (elemento == evento.category) && ((evento.name.toLowerCase().includes(keyWord)) || (evento.description.toLowerCase().includes(keyWord))) )
        .forEach(evento => { htmlEvents += createCard(evento) });
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
                upcomingEvents.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += createCard(evento) });
                cardContainer.innerHTML = htmlEvents;
            };
        } else if ( (checkeados.length > 0) && (keyWord != "") ) {
            bothFiltersSearch(checkeados, keyWord, htmlEvents);            
        } else {
            createUpcomingEventsCards();
        };
    });
};


// Quito la recarga de la pagina por default del Submit al Form
const searchForm = document.querySelector(".searchForm");
searchForm.addEventListener('submit', e => {
    e.preventDefault();
});


// Realizo la busqueda por el searchInput
const searchClick = document.querySelector(".searchSubmit");
const searchInput = document.querySelector(".searchInput");
searchClick.addEventListener('click', () => {
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
        upcomingEvents.forEach(event => {
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
        createUpcomingEventsCards();
    };
});