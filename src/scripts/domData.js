document.querySelector("#search").addEventListener("click", () => {
  const $city= document.querySelector("#shClima").value;
    getDom($city)
});
export function getDom(city){
    return city
}