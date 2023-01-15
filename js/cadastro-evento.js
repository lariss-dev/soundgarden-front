const BASE_URL = 'https://soundgarden-api.deta.dev';

const formCadastroEvento = document.querySelector('#cadastro-evento');

formCadastroEvento.addEventListener('submit', async (event) => {
  const loading = document.querySelector(".loading");

  loading.setAttribute("style", "display:flex");
  //evitar que a página seja recarregada
  event.preventDefault();

  const inputNome = document.getElementById("nome");
  const inputAtracoes = document.getElementById("atracoes");
  const inputDescricao = document.getElementById("descricao");
  const inputData = document.getElementById("data");
  const inputLotacao = document.getElementById("lotacao");
  const inputBanner = document.getElementById("banner");

  // conversão de data para padrão do banco de dados
  const fullDateTime = new Date(inputData.value);

  // criando objeto com os dados do evento
  const novoEventoObj = {
      "name": inputNome.value,
      "poster": inputBanner.value,
      "attractions": inputAtracoes.value.split(","),
      "description": inputDescricao.value,
      "scheduled": fullDateTime.toISOString(),
      "number_tickets": inputLotacao.value
  };

  // convertendo Obj para JSON
  const novoEventoJSON = JSON.stringify(novoEventoObj);

  // conexão com API para cadastrar novo evento
  // salvando resposta na const
  const resposta = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: novoEventoJSON
  }).then((response) => {
      return response.json();
  }).then((responseOBJ) => {
    loading.setAttribute("style", "display:none");
    alert("Evento adicionado com sucesso");

    window.location.href = './admin.html';
  }).catch(error => {
    alert("Aconteceu um erro, tente novamente.");
    
    loading.setAttribute("style", "display:none");
  });
});