import "../style/style.css";
import { getDataApi, getDataJson } from "./requestAPI.js";
import { addDom } from "./responseToDom.js";
document.querySelector(".pesquisa").addEventListener("submit", function(event) {
  event.preventDefault();  // Impede o reload da página
});
document.querySelector("#search").addEventListener("click", () => {
  const city = document.querySelector("#shClima").value.trim();
  if (city) {
    // Chama a API com a cidade fornecida
    getDataApi(city).then((res) => {
      const data = getDataJson(res);
      addDom(data, city); // Renderiza os dados no DOM, passando a cidade
    });
  } else {
    alert("Preencha o campo da cidade.");
  }
});
