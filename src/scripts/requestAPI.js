// Função para buscar dados da API

function mostrarCarregamento() {
  document.getElementById("loading").style.display = "block";
}

function esconderCarregamento() {
  document.getElementById("loading").style.display = "none";
}

export const getDataApi = async (city) => {
  mostrarCarregamento(); // Mostrar a mensagem de carregamento
  try {
    const key = "6YEKLPKHD9DMPTTCZKHDE9JYW";
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`
    );
    if (!response.ok) {
      throw new Error("Não foi possível encontrar a região.");
    }
    return await response.json();
  } catch (erro) {
    console.log("ERRR", erro.message);
    return null;
  } finally {
    esconderCarregamento(); // Esconder a mensagem de carregamento
  }
};

// Função para converter Fahrenheit para Celsius
const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

// Tradução das condições climáticas
const traducaoCondicaoClima = (condition) => {
  const translations = {
    Clear: "Céu limpo",
    "Partially cloudy": "Parcialmente nublado",
    Cloudy: "Nublado",
    Rain: "Chuva",
    Snow: "Neve",
    Thunderstorm: "Tempestade",
    Fog: "Nevoeiro",
    Windy: "Ventania",
  };
  return translations[condition] || condition;
};

// Função para processar os dados da API
export const getDataJson = (jsonApi) => {
  if (!jsonApi || !jsonApi.days || jsonApi.length === 0) {
    return [];
  }

  return jsonApi.days.map((day) => ({
    temperatura: fahrenheitToCelsius(day.temp).toFixed(1),
    velocidadeVento: day.windspeed,
    diaSemana: new Date(day.datetime).toLocaleDateString("pt-BR", {
      weekday: "long",
    }),
    horaAtual: new Date().toLocaleTimeString(),
    condicaoTempo: traducaoCondicaoClima(day.conditions),
  }));
};
