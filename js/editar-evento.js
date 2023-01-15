const BASE_URL = 'https://soundgarden-api.deta.dev';

const params = new URLSearchParams(document.location.search);
const id = params.get('id');

const form = document.getElementById('form');

async function getEvent(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/events/${id}`
    );
    const events = await response.json();
    return events;
  } catch(error){
    alert("Aconteceu um erro, recarregue a página novamente.");
  }

}

async function updateEvent(id, formData) {
  const response = await fetch(
    `${BASE_URL}/events/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const event = await response.json();
  return event;
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

form.addEventListener('submit', event => {
  const loading = document.querySelector(".loading");

  loading.setAttribute("style", "display:flex");

  event.preventDefault();

  const name = event.target.nome.value;
  const banner = event.target.banner.value;
  const attractions = event.target.atracoes.value;
  const description = event.target.descricao.value;
  const scheduled = event.target.data.value;
  const tickets = event.target.lotacao.value;

  const dataList = scheduled.split('/');
  const day = dataList[0];
  const month = dataList[1];
  const yearHour = dataList[2];
  const date = month + '/' + day + '/' + yearHour;

  const formData = {
    name,
    poster: banner,
    attractions: attractions.split(','),
    description,
    scheduled: new Date(date).toISOString(),
    number_tickets: parseInt(tickets)
  };

  updateEvent(id, formData).then(event => {
    alert("Evento atualizado com sucesso");
    loading.setAttribute("style", "display:none");

    window.location.href = './admin.html';
  });
});