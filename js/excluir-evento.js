const BASE_URL = 'https://soundgarden-api.deta.dev';

const params = new URLSearchParams(document.location.search);
const id = params.get('id');

const form = document.getElementById('form');

form.addEventListener('submit', event => {
  const loading = document.querySelector(".loading");
  loading.setAttribute("style", "display:flex");

  event.preventDefault();

  deleteEvent(id).then(() => {
    alert("Evento excluido com sucesso");
    loading.setAttribute("style", "display:none");

    window.location.href = './admin.html';
  }).catch(error => {
    alert("Aconteceu um erro, tente novamente.");
  });
});

async function getEvent(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/events/${id}`
    );
    const events = await response.json();
    return events;
  } catch(error){
    alert("Aconteceu um erro ao carregar os dados do evento.");
  }

}

async function deleteEvent(id) {
  const response = await fetch(
    `${BASE_URL}/events/${id}`,
    {
      method: 'DELETE'
    }
  );
  return response;
}

const event = getEvent(id).then(event => {
  const loadingEvent = document.querySelector(".loadingEvent");

  const date = new Date(event.scheduled);
  const formattedDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  const name = document.getElementById('nome');
  name.value = event.name;

  const banner = document.getElementById('banner');
  banner.value = event.poster;

  const attractions = document.getElementById('atracoes');
  attractions.value = event.attractions;

  const description = document.getElementById('descricao');
  description.innerHTML = event.description;

  const dateInput = document.getElementById('data');
  dateInput.value = formattedDate;

  const tickets = document.getElementById('lotacao');
  tickets.value = event.number_tickets;

  loadingEvent.setAttribute("style", "display:none");
});