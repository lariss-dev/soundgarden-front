const BASE_URL = 'https://soundgarden-api.deta.dev';

const modal = document.querySelector("#modal");
const form = document.querySelector("#form");
const ingresso = document.querySelector("#ingresso");
const email = document.querySelector("#email");
const nome = document.querySelector("#name");
const inputId = document.querySelector("#inputId");
const botaoX = document.querySelector("#btn-x");
const botaoClose = document.querySelector("#btn-fechar");

const formatData = (date) => {
  let data = date.split("");
  let formatedData =
    data.slice(8, 10).join("") +
    "/" +
    data.slice(5, 7).join("") +
    "/" +
    data.slice(0, 4).join("");

  return formatedData;
};

const openModal = async (id) => {
  modal.setAttribute("style", "display:flex");
  inputId.value = id;
  const resposta = await fetch(`${BASE_URL}/events/${id}`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });

  const tituloModal = document.querySelector("#titulo-modal");
  const tickets = document.querySelector("#tickets");

  const selectedEventData = await resposta.json();
  tituloModal.innerHTML = `Reserve seu ingresso para ${selectedEventData.name}`;
  tickets.innerHTML = `Tickets disponíveis: (${selectedEventData.number_tickets})`;
  ingresso.max = selectedEventData.number_tickets;
}

const closeModal = () => {
  modal.setAttribute("style", "display:none");
  nome.value = "";
  email.value = "";
  ingresso.value = "";
  inputId.value = "";
}

botaoClose.onclick = () => {
  closeModal();
};

botaoX.onclick = () => {
  closeModal();
};

const createEventCardElement = event => {
  let eventCardElement = document.createElement('article');
  eventCardElement.className = 'evento card p-5 m-3'

  let name = document.createElement('h2');
  let attractions = document.createElement('h4');
  let description = document.createElement('p');
  let reserveButton = document.createElement('button');

  name.innerHTML = `${event.name} - ${formatData(event.scheduled)}`;
  attractions.innerHTML = event.attractions.join(', ');
  description.innerHTML = event.description

  reserveButton.className = 'btn btn-primary'
  reserveButton.innerHTML = 'reservar ingresso'
  reserveButton.onclick = () => openModal(event._id);

  eventCardElement.appendChild(name);
  eventCardElement.appendChild(attractions);
  eventCardElement.appendChild(description);
  eventCardElement.appendChild(reserveButton);

  return eventCardElement;
};

const getFirstEvents = async () => {
  fetch(`${BASE_URL}/events`, { method: 'GET' })
  .then(function(response) {
    return response.json();
  })
  .then((data) => {
    const eventsList = document.getElementById('events-list');

    const eventsItems = data;

    if (Array.isArray(eventsItems) && eventsItems.length > 0) {
      eventsItems.map((todoItem, index) => {
        if(index >= 3) return;
        eventsList.appendChild(createEventCardElement(todoItem));
      });
    } else if (eventsItems) {
      eventsList.appendChild(createEventCardElement(eventsItems));
    }
  })
  .catch((error) => console.log('error', error))
}

getFirstEvents();

form.onsubmit = async (evento) => {
  evento.preventDefault();

  const reservarTicket = {
    owner_name: nome.value,
    owner_email: email.value,
    number_tickets: parseInt(ingresso.value),
    event_id: inputId.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(reservarTicket),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const resposta = await fetch(`${BASE_URL}/bookings`, options);

  if (resposta.status == 201) {
    alert("Reserva realizada com sucesso");

    closeModal();
  }
};