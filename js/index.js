function createHomeCards () {
let htmlEvents = "";
const cardContainer = document.getElementById("card-container");

for (let event of data.events) {
    htmlEvents += createCard(event);
};
cardContainer.innerHTML = htmlEvents;
}
createHomeCards();
let listCategories = "";
const checkContainer = document.querySelector(".contCheck");
for (let category of categories) {
    listCategories += createCheckbox(category);
};
checkContainer.innerHTML = listCategories;

const homeChecks = document.querySelectorAll(".form-check-input");
for (let check of homeChecks) {
    check.addEventListener('change', () => {
        let checkeados = [];
        for (let chk of homeChecks) {
            if (chk.checked) {
                checkeados.push(chk.value)
            };
        };

        if ( checkeados.length > 0) {
            let htmlEvents = "";
            let cardContainer = document.getElementById("card-container");
            for(let elemento of checkeados) {
                data.events.filter(evento => elemento == evento.category).forEach(evento => { htmlEvents += createCard(evento) });
            };
            cardContainer.innerHTML = htmlEvents;
        } else {
            createHomeCards();
        };
    });
};


const searchForm = document.querySelector(".searchForm");
searchForm.addEventListener('submit', e => {
    e.preventDefault();
});

const searchClick = document.querySelector(".searchSubmit");
const searchInput = document.querySelector(".searchInput");
searchClick.addEventListener('click', () => {
    let htmlEvents = "";
    let cardContainer = document.getElementById("card-container");
    let result = false;
    let keyWord = searchInput.value.toLowerCase().trim();
    if (keyWord != "") {
        for (let event of data.events) {
            if ( ( (event.name.toLowerCase().includes(keyWord)) || (event.description.toLowerCase().includes(keyWord)) )) {
                htmlEvents += createCard(event);
                result = true;
            }
        }
        if (result) {
            cardContainer.innerHTML = htmlEvents;
        } else {
            nothingFound(keyWord);
        }
    } else {
        createHomeCards();
    }
});