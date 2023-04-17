import STORE_DATA from "../storeData.js";
import { ROUTES } from "../routes.js";
import { executorRequest } from "../http/executor.js";

// Funções para buscar dados da API
const dataState = () => {
   return new Promise((resolve, reject) => {
      executorRequest(ROUTES.portalEstado)
         .then((jsonEstado) => {
            STORE_DATA.portalEstado = jsonEstado;
            resolve();
         })
         .catch((err) => {
            reject();
         });
   });
};

const dataCity = () => {
   return new Promise((resolve, reject) => {
      executorRequest(ROUTES.portalMunicipio)
         .then((jsonMunicipio) => {
            STORE_DATA.portalMunicipio = jsonMunicipio;
            resolve();
         })
         .catch((err) => {
            reject();
         });
   });
};

const dataBrazil = () => {
   return new Promise((resolve, reject) => {
      executorRequest(ROUTES.portalGeral)
         .then((jsonGeral) => {
            STORE_DATA.portalGeral = jsonGeral;
            resolve();
         })
         .catch((err) => {
            reject();
         });
   });
};

export { dataBrazil, dataCity, dataState };
