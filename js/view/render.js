import STORE_DATA from "../storeData.js";
import { formatDecimal, toCompareString } from "../format.js";

const renderState = () => {
   const containerState = document.querySelector(".container_state");
   const { portalEstado } = STORE_DATA;

   const stateRJ = portalEstado.filter((states) => {
      if (states.nome == "RJ") {
         return states;
      }
   });

   // (destruct) traz as propridades do objeto estadoRJ como variaveis
   const { casosAcumulado, obitosAcumulado } = stateRJ[0];

   containerState.innerHTML = `
      <div class="info_state">
         <h2 class="title_state">Casos confirmados</h2>
         <h4 class="number_state">${formatDecimal(casosAcumulado)}</h4>
      </div>
      <div class="info_state">
         <h2 class="title_state">Obitos</h2>
         <h4 class="number_state">${formatDecimal(obitosAcumulado)}</h4>
      </div>  
   `;
};

const renderCitys = () => {
   const { portalMunicipio } = STORE_DATA;
   const containerCidades = document.querySelector(".container_city");

   const mainCitys = portalMunicipio.filter((citys) => {
      const myCitys = ["Rio de Janeiro", "São Gonçalo", "Niterói", "Petrópolis"];

      if (myCitys.includes(citys.nome)) {
         return citys;
      }
   });

   // Varredura pelo array cidades exibindo no HTML as cidades selecionadas
   mainCitys.forEach((city) => {
      containerCidades.innerHTML += `
         <div class="info_city">
            <h2>${city.nome}</h2>
            <div class="line"></div>
            <h3>${formatDecimal(city.casosAcumulado)}</h3>
            <p>Casos confirmados</p>
            <h3>${formatDecimal(city.obitosAcumulado)}</h3>
            <p>Óbitos</p>
         </div>
      `;
   });
};

let graphCity;
function chartCity() {
   const { portalMunicipio } = STORE_DATA;
   const canvasCity = document.getElementById("main-citys");
   const labelsCity = ["Nova Iguaçu", "Campos dos Goytacazes", "Duque de Caxias"];
   let valuesCasesCity = [];
   let valuesDeathCity = [];

   portalMunicipio.forEach((city) => {
      if (labelsCity.includes(city.nome)) {
         valuesCasesCity.push(city.casosAcumulado);
         valuesDeathCity.push(city.obitosAcumulado);
      }
   });
   graphCity = new Chart(canvasCity, {
      type: "bar",
      data: {
         labels: labelsCity,
         datasets: [
            {
               label: "Casos acumulados",
               data: valuesCasesCity,
               borderWidth: 2,
               backgroundColor: "#01579b",
               borderRadius: 10,
            },
            {
               label: "Óbitos acumulados",
               data: valuesDeathCity,
               borderWidth: 2,
               backgroundColor: "#ce0404",
               borderRadius: 10,
            },
         ],
      },
   });
}

const renderBrazil = () => {
   const { portalGeral } = STORE_DATA;
   const containerBrazil = document.querySelector(".container_brasil");
   const containerDate = document.querySelector(".container_date");

   const brazilFound = portalGeral.filter((dataBrazil) => {
      if (dataBrazil.regiao == "Brasil") {
         return dataBrazil;
      }
   });

   const {
      casosAcumulado,
      obitosAcumulado,
      Recuperadosnovos,
      emAcompanhamentoNovos,
      dataFormat,
      year,
   } = brazilFound[0];

   containerBrazil.innerHTML = `
   <div class="info_brasil">
       <h2 class="title_brasil">Total de casos investigados</h2>
       <h4 class="number_brasil">${formatDecimal(casosAcumulado)}</h4>
    </div>
 
    <div class="info_brasil">
       <h2 class="title_brasil">Óbitos acumulados</h2>
       <h4 class="number_brasil">${formatDecimal(obitosAcumulado)}</h4>
    </div>
 
    <div class="info_brasil">
       <h2 class="title_brasil">Casos recuperados</h2>
       <h4 class="number_brasil">${formatDecimal(Recuperadosnovos)}</h4>
    </div>
 
    <div class="info_brasil">
       <h2 class="title_brasil">Casos em acompanhamento</h2>
       <h4 class="number_brasil">${formatDecimal(emAcompanhamentoNovos)}</h4>
    </div>`;

   containerDate.innerHTML = `
    <h4>Ultima atulização: ${dataFormat}/${year}</h4>`;
};

const renderRegion = () => {
   const { portalGeral } = STORE_DATA;
   const containerRegions = document.querySelector(".table_region");

   const regionsFound = portalGeral[1].filter((regions) => {
      if (regions._id !== "Brasil") {
         return regions;
      }
   });

   regionsFound.forEach((region) => {
      const { _id, casosAcumulado, obitosAcumulado, populacaoTCU2019 } = region;

      containerRegions.innerHTML += `
         <tbody>
            <tr>
               <th class="region_name">${_id}</th>
               <td>${formatDecimal(populacaoTCU2019)}</td>
               <td>${formatDecimal(casosAcumulado)}</td>
               <td>${formatDecimal(obitosAcumulado)}</td>
            </tr>
         </tbody>
      `;
   });
};

function searchCity() {
   const { portalMunicipio } = STORE_DATA;
   const containerPesquisa = document.querySelector(".container_citySearched");
   const UF_RIO_JANEIRO = 33;

   containerPesquisa.innerHTML = `<div class="loader_animation"></div>`;

   setTimeout(() => {
      let textSearch = document.querySelector(".text_search");

      const cityFound = portalMunicipio.filter((citys) => {
         const isRioJaneiro = Number(citys.cod.substring(0, 2)) === UF_RIO_JANEIRO;

         if (toCompareString(citys.nome) === toCompareString(textSearch.value) && isRioJaneiro) {
            return citys;
         }
      });

      if (cityFound.length) {
         const { nome, casosAcumulado, obitosAcumulado } = cityFound[0];

         containerPesquisa.innerHTML = `
         <div class="info_search">
            <h2>${nome}</h2>
            <div class="line"></div>
            <h3>${formatDecimal(casosAcumulado)}</h3>
            <p>Casos confirmados</p>
            <h3>${formatDecimal(obitosAcumulado)}</h3>
            <p>Óbitos</p>
         </div>`;
      } else {
         containerPesquisa.innerHTML = `
         <div class="container_not_found">
            <img src="img/cityNotFound.svg" alt="cidade não encontrada" class="img_not_found" />
            <h2 class="text_not_found"> Cidade não encontrada!</h2>
         </div>`;
      }
   }, 300);
}

export { renderState, renderCitys, renderBrazil, renderRegion, searchCity, chartCity, graphCity };
