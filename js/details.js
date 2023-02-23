let cardDetailPage = document.getElementById("detailCard");
let idElemento = parseInt(localStorage.getItem('idDetailClick'));
let evento = data.events[idElemento];
let htmlDetail = 
    `
    <img class="img-detail p-2 border border-danger rounded-start" src="${evento.image}" alt="Detail image">
    <div class="card text-center px-3 border border-danger" style="width: 28rem; height:28rem">
        <div class="card-body">
            <h2 class="card-title">${evento.name}</h2>
            <p class="card-text fs-5">${evento.description}</p>
            <div class="card-footer mt-4 text-start">
                <p><span>Category: </span>${evento.category}</p>
                <p><span>Date: </span>${evento.date}</p>
                <p><span>Place: </span>${evento.place}</p>
                <p><span>Capacity: </span>${evento.capacity}</p>
                <p id="assisEstimate"></p>
                <p><span>Price: </span>$ ${evento.price}</p>
            </div>
        </div>
    </div>

    `;
cardDetailPage.innerHTML = htmlDetail;
let currentDate = new Date(data.currentDate);
let eventDate = new Date(evento.date);
let assisEstimate = document.getElementById("assisEstimate");
if (eventDate < currentDate) {
    assisEstimate.innerHTML = `<span> Assistance: </span>${evento.assistance}`
} else {
    assisEstimate.innerHTML = `<span>Estimate: </span>${evento.estimate}`

}