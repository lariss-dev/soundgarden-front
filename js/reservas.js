const BASE_URL = 'https://soundgarden-api.deta.dev';

const params = new URLSearchParams(document.location.search);
const id = params.get('id');

const showReservations = async () => {
  const list = document.querySelector("tbody");
  const options = {
      method: 'GET',
      redirect: 'follow'
  };
  const response = await fetch(`${BASE_URL}/bookings/${id}`, options);
  const content = await response.json();

  let admin = '';
  
  if(!content) {
    admin += `
    <tr>
      <td>Sem reservas para este evento</td>
    </tr>
    `;

    return list.innerHTML = admin;
  }
  
  for(let i=0; i<content.length; i++){
    admin += `
    <tr>
      <th scope="row">${i}</th>
      <td>${content[i].owner_name}</td>
      <td>${content[i].owner_email}</td>
      <td>${content[i].number_tickets}</td>
      <td>
          <a href="excluir-reserva.html?id=${content[i]._id}" class="btn btn-danger">excluir</a>
      </td>
    </tr>
  `};

  list.innerHTML = admin;
}

showReservations();