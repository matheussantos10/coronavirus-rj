import { dataState, dataBrazil, dataCity } from "./http/requests.js";
import {
   renderState,
   renderCitys,
   renderBrazil,
   renderRegion,
   searchCity,
   graphCity,
   chartCity,
} from "./view/render.js";

function setListener() {
   handleSearchCity();
   handleKeyPress();
   handleRenderGraph();
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

function handleRenderGraph() {
   window.addEventListener("resize", reRenderGraph);
}

function reRenderGraph() {
   graphCity.destroy();
   chartCity();
}

window.onload = () => {
   dataState().then(() => renderState());

   dataCity().then(() => {
      chartCity();
      renderCitys();
   });

   dataBrazil().then(() => {
      renderBrazil();
      renderRegion();
   });

   setListener();
};
