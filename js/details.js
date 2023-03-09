const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const evento = data.events.find(event => event._id == id);



let cardDetailPage = document.getElementById("detailCard");

let htmlDetail = 
    `
    <img class="img-detail" src="${evento.image}" alt="Detail image">

    <div class="card card-detail rounded-0 text-center")">
        <div class="card-body card-detail-body">
            <h2 class="card-title fs-1">${evento.name}</h2>
            <p class="card-text fs-4">${evento.description}</p>
            <div class="detail-data mt-4 fs-5">
                <p><span>Category: </span>${evento.category}</p>
                <p><span>Date: </span>${evento.date}</p>
                <p><span>Place: </span>${evento.place}</p>
                <p><span>Capacity: </span>${evento.capacity}</p>
                <p id="assistEstimate"></p>
                <p><span>Price: </span>$ ${evento.price}</p>
            </div>
        </div>
    </div>

    `;
cardDetailPage.innerHTML = htmlDetail;
let currentDate = new Date(data.currentDate);
let eventDate = new Date(evento.date);
let assisEstimate = document.getElementById("assistEstimate");
if (eventDate < currentDate) {
    assisEstimate.innerHTML = `<span> Assistance: </span>${evento.assistance}`
} else {
    assisEstimate.innerHTML = `<span>Estimate: </span>${evento.estimate}`
}