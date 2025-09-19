import { testFlight } from "../data/data.js";

let allFlights = []; //para poder guardar el json

const getFlights = async () => {
  try {
    const rta = await fetch("http://127.0.0.1:5501/data/vuelos.json");
    const flights = await rta.json();

    allFlights = flights;

    renderFlights(flights);
  } catch (error) {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = `No se pudieron obtener los vuelos, estamos trabajando para solucionar el problema.`;
    console.log("Error al obtener los vuelos: ", error);
  }
};

const renderFlights = (flights) => {
  //reference elements
  const containerFlights = document.querySelector("#container_flights")
  containerFlights.innerHTML = ""; //limpiar

  //Create table
  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-hover");

  //create thead
  const thead = document.createElement("thead");

  //create tr
  const trThead = document.createElement("tr");

  //headers
  const headers = ["Destino", "Hora de salida", "Estado"];

  headers.forEach((texto) => {
    //create th
    const th = document.createElement("th");
    th.textContent = texto;

    trThead.appendChild(th);
  });

  thead.appendChild(trThead);
  table.appendChild(thead);

  //create tbody
  const tbody = document.createElement("tbody");

  const statusColor = {
    "En horario": "text-success",
    "Retrasado": "text-warning",
    "Cancelado": "text-danger",
    "Embarcando": "text-primary",
  };

  //forEach flights
  flights.forEach((flight) => {

    //create element tr
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="h6"><img src="${
        flight.bandera_url
      }" alt="Bandera" width="30" height="25" class="me-2">${
          flight.destino_ciudad
        } / ${flight.destino_pais}</td>
      <td>${flight.hora_salida}</td>
      <td class="${statusColor[flight.estado] || ""}">${flight.estado}</td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  containerFlights.appendChild(table);
};

document.addEventListener("DOMContentLoaded", () => {
  //renderFlights(testFlight) //exercise one

  getFlights();

  setInterval(() => {
    getFlights();
  }, 60000);
});

const codeSearchHandler = (allFlights) => {
  const inputFlight = document.querySelector("#inputFlight").value.trim();

  const searchFlight = allFlights.filter(
    (flight) => flight.codigo === inputFlight
  );


  if (searchFlight.length > 0) {
    renderFlights(searchFlight)
  } else {
    window.location.href = "./error/error.html";
  }
};

const button = document.querySelector("#btn-search");
button.addEventListener("click", () => codeSearchHandler(allFlights) );
