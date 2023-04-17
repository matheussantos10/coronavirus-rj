import { dataState, dataBrazil, dataCity } from "./http/requests.js";
import { renderState, renderCitys, renderBrazil, renderRegion, searchCity } from "./view/render.js";

function setListener() {
   handleSearchCity();
   handleKeyPress();
}

function handleSearchCity() {
   document.querySelector(".btn_search").addEventListener("click", searchCity);
}

function handleKeyPress() {
   document.querySelector(".text_search").addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
         searchCity();
      }
   });
}

window.onload = () => {
   dataState().then(() => renderState());

   dataCity().then(() => renderCitys());

   dataBrazil().then(() => {
      renderBrazil();
      renderRegion();
   });

   setListener();
};
