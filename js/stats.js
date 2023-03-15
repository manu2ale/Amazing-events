// Events Statistics

let arrayCategories = [];
let pastEvents = [];
let upcomingEvents = [];
let currentDate = new Date(data.currentDate);
// Obtengo los eventos pasados, futuros y las categorias
data.events.forEach(event => {
    let eventDate = new Date(event.date);
    if (eventDate < currentDate) {
        pastEvents.push(event);
    } else {
        upcomingEvents.push(event);
    };
    if (!arrayCategories.includes(event.category)) {
        arrayCategories.push(event.category);
    };
});

let highestAttendance;
let maxAttendance = 0;
let lowestAttendance;
let minAttendance = (pastEvents[0].assistance * 100) / pastEvents[0].capacity;

// Obtengo el Evento con mayor asistencia y el de menor asistencia
pastEvents.forEach(event => {
    let percent = (event.assistance * 100) / event.capacity;

    if ( percent > maxAttendance) {
        maxAttendance = percent;
        highestAttendance = event;
    };
    
    if (percent < minAttendance) {
        minAttendance = percent;
        lowestAttendance = event;
    }
});

// Obtengo el evento que tiene mayor Capacidad
let maxCapacity = Math.max(...data.events.map(event => event.capacity));
let largerCapacity = data.events.find(event => event.capacity == maxCapacity);

// Creo el HTML con los datos obtenidos
let eventsStatsHTML = 
    `
        <tr>
            <td>${highestAttendance.name}</td>
            <td>${lowestAttendance.name}</td>
            <td>${largerCapacity.name}</td>
        </tr>
    `;

// Inserto los datos obtenidos en la tabla
const eventsStats = document.getElementById('eventsStatistics');
eventsStats.insertAdjacentHTML('afterend', eventsStatsHTML);


// Upcoming events statistics by category
let upcomingStatsHTML = '';
let pastStatsHTML = '';
for (let categ of arrayCategories) {
    let revenues = 0;
    let percentAttend = 0;
    let accAttend = 0;
    let contAttend = 0;

    upcomingEvents.filter(event => event.category.includes(categ))
    .forEach(event => {
            revenues += event.price * event.estimate;
            accAttend += ((event.estimate*100)/event.capacity);
            contAttend++;
    });
    isNaN(Math.round(accAttend/contAttend)) ? 0 : percentAttend=Math.round(accAttend/contAttend);
    upcomingStatsHTML += 
    `<tr>
        <td>${categ}</td>
        <td>${revenues}</td>
        <td>${percentAttend}</td>
     </tr>`;
     

     revenues = 0;
     accAttend = 0;
     contAttend = 0;
     pastEvents.filter(event => event.category.includes(categ))
     .forEach(event => {
             revenues += event.price * event.assistance;
             accAttend += ((event.assistance*100)/event.capacity);
             contAttend++;
     });
     isNaN(Math.round(accAttend/contAttend)) ? 0 : percentAttend=Math.round(accAttend/contAttend);
     pastStatsHTML += 
     `<tr>
         <td>${categ}</td>
         <td>${revenues}</td>
         <td>${percentAttend}</td>
      </tr>`;
};

const upcomingStats = document.getElementById('upcomingStats');
const pastStats = document.getElementById('pastStats');

upcomingStats.insertAdjacentHTML('afterend', upcomingStatsHTML);
pastStats.insertAdjacentHTML('afterend', pastStatsHTML);