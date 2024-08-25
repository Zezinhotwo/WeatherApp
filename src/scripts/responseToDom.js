import solImg from "../assets/sol.png";
import chuvaImg from "../assets/chuva.png";
import nubladoImg from "../assets/nublado.png";
import tempestadeImg from "../assets/tempestade.png";

export function addDom(data, city) {
  const climaImagens = {
    "Céu limpo": solImg,
    "Chuva": chuvaImg,
    "Parcialmente nublado": nubladoImg,
    "Tempestade": tempestadeImg,
    // Adicione mais condições e imagens conforme necessário
  };

  const htmlContent = data
    .map(
      (item, index) => `
        <div class="clima">
            <img src="${climaImagens[item.condicaoTempo]}" alt="${item.condicaoTempo}">
            <h2><span class="title1">${city}</span>&nbsp; ${item.temperatura}°C</h2>
            <p><span class="title">Vento</span>&nbsp; ${item.velocidadeVento} km/h</p>
            <p><span class="title">Tempo</span>&nbsp; ${item.condicaoTempo}</p>
            <p id="hora-${index}"><span class="title">${item.diaSemana}</span>&nbsp; <span class="hora-atual">${item.horaAtual}</span></p>
        </div>
      `
    )
    .join("");

  const $sectionCard = document.querySelector(".resultDom");
  $sectionCard.innerHTML = htmlContent;

  // Atualiza a hora a cada segundo para cada item
  data.forEach((item, index) => {
    setInterval(() => {
      const horaElement = document.querySelector(`#hora-${index} .hora-atual`);
      horaElement.textContent = new Date().toLocaleTimeString();
    }, 1000);
  });
}
