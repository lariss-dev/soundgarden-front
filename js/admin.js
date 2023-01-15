const BASE_URL = 'https://soundgarden-api.deta.dev';

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

const getAllEvents = async () => {

    const eventos = await fetch(`${BASE_URL}/events`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {

        //retorna lista em array de objetos
        return resposta.json();
    });

    // console.log(eventos);

    const tbody = document.querySelector('.events-list tbody');

    let htmlEventos = "";

    eventos.forEach(evento => {
        htmlEventos += `
            <tr>
                <th scope="row">#</th>
                <td>${evento.scheduled}</td>
                <td>${evento.name}</td>
                <td>${evento.attractions.join(', ')}</td>
                <td>
                  <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
                  <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
                  <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
                </td>
              </tr>
        `;
    });

    tbody.innerHTML = htmlEventos;


}

getAllEvents();

// quando a janela termina de carregar
window.onload = () => {
    console.log('pagina carregada');
    //  pega url da  pagina
    const url = new URL(window.location.href);
    //separando parametro acao
    const acao = url.searchParams.get('acao');

    console.log(acao);

    if (acao != null && acao == 'edit') {
        alert('Evento atualizado com sucesso!');
    }
}