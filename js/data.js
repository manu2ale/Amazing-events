//Obtengo los datos desde el endpoint de la API 
const urlAPI = ('https://mindhub-xj03.onrender.com/api/amazing');
async function dataApi() {
  try {
    let response = await fetch(urlAPI);
    let data = await response.json();
    localStorage.setItem('dataLocal', JSON.stringify(data));    
  } catch (error) {
    console.error('Cant get data: ' + error);
  }
};

dataApi();
let data = JSON.parse(localStorage.getItem('dataLocal'));


function createCard(event) {
  let card =  `
      <div class="card d-flex text-center border-danger" style="width: 18rem;">
      <div class="img">
        <img src="${event.image}" class="card-img-top" alt="...">
      </div>
        <div class="card-body">
            <h3 class="card-title mb-3">${event.name}</h3>
            <p class="card-text mb-3">${event.description}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center align-self-bottom mb-3">
              <span>Price: $ ${event.price}</span>
              <a href="./details.html?id=${event._id}" class="btn ms-3">More</a>
            </div>
      </div>
      `
  return card;
};


// Crear e insertar checkbox de categorias
function insertCheckbox() {
  let listCategories = "";
  const checkContainer = document.querySelector(".contCheck");
  let categories = [];

  data.events.forEach(evento => {
    if (!categories.includes(evento.category)) {
      categories.push(evento.category);
      listCategories += `<div class="form-check form-check-inline">
      <input class="form-check-input checkbox-info shadow-none border border-dark-subtle" type="checkbox" name="Category" value="${evento.category}" id="${evento.category}">
      <label class="form-check-label" for="${evento.category}">${evento.category}</label>
      </div>`;
    }
checkContainer.innerHTML = listCategories;
});
};


// Crear mensaje de error de búsqueda
function nothingFound(word) {
  document.getElementById('card-container').innerHTML = `
  <div class="text-center">
  <p class="pb-3"><i class="bi bi-search fs-1"></i></p>
  <h3>We couldn't find anything for '${word}'</h3>
  <p>You may want to try using different keywords, deselecting filters, or checking for spelling mistakes.</p>
  </div>
  `
};
