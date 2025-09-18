const getFlights = async() => {
  try {
    const rta = await fetch("http://127.0.0.1:5501/data/vuelos.json")
    const flights= await rta.json()

    renderFlights(flights)
  } catch (error) {
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = `No se pudieron obtener los vuelos, estamos trabajando para solucionar el problema.`
    console.log("Error al obtener los vuelos: ", error)
  }
}

const renderFlights = (flights) => {
//reference elements
const containerFlights = document.querySelector("#container_flights")
containerFlights.innerHTML = "" //limpiar

//Create table
const table = document.createElement("table")
table.classList.add("table", "table-striped", "table-hover")

//create thead
const thead = document.createElement("thead")

//create tr
const trThead = document.createElement("tr")


//headers
const headers = ["Destino", "Hora de salida", "Estado"]

headers.forEach(texto => {
  //create th
  const th = document.createElement("th")
  th.textContent = texto
  
  trThead.appendChild(th)
})

thead.appendChild(trThead)
table.appendChild(thead)

//create tbody
const tbody = document.createElement("tbody")

const statusColor = {
  "En horario": "text-success",
  "Retrasado": "text-warning",
  "Cancelado": "text-danger",
  "Embarcando": "text-blue",
}

//forEach fligths
flights.forEach((flight) => {
  
  //create element tr
  const tr = document.createElement("tr")

  tr.innerHTML = `
  <td class="h6"><img src="${flight.bandera_url}" alt="Bandera" width="30" height="25">${flight.destino_ciudad} / ${flight.destino_pais}</td>
  <td>${flight.hora_salida}</td>
  <td class="${statusColor[flight.estado] || ""}">${flight.estado}</td>
  `
  
  tbody.appendChild(tr)
})

table.appendChild(tbody)

containerFlights.appendChild(table)

}

getFlights()