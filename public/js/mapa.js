/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n(function() {\r\n    //Usamos || porque el valor no es Null sino Vacio ''\r\n    const lat = document.querySelector('#lat').value || -11.985492;\r\n    const lng = document.querySelector('#lng').value || -77.099778;\r\n    const mapa = L.map('mapa').setView([lat, lng ], 16);            //Instacia el mapa y le guarda el div con id MAPA\r\n    let marker;\r\n\r\n    // https://leafletjs.com/examples/quick-start/              => Pagina para encontrar la Documentacion\r\n    //Utiliar Provider y Geocoder\r\n    const geocodeService = L.esri.Geocoding.geocodeService();       //Instanciamos, geocodeServices, esto lo obtenemos de los SCRIPT\r\n\r\n    //Esta permite que se muestre los mapas/(NECESARIO)\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n\r\n    //El Pin\r\n    marker = new L.marker([lat,lng],{\r\n        draggable: true,    //permite mover el pin\r\n        autoPan: true       //Permite mover la pantalla mientras el pin se desplaza\r\n    }).addTo(mapa);\r\n\r\n    //Detectar el Movimiento del Pin\r\n    marker.on('moveend', function(e){\r\n        marker = e.target           //capturamos todo los datos del ultimo vomiento del mouse\r\n        const posicion = marker.getLatLng();\r\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))        //permite el panTo que la pantalla se oriente automatico alrededor del Pin\r\n    \r\n        //Obtener la informacion de las calles al soltar el pin\r\n        geocodeService.reverse().latlng(posicion,16).run(function(error,resultado){     //Permite de acuerdo a las coordenadads mostrar los nombres de las calles\r\n            marker.bindPopup(resultado.address.LongLabel)                               // Permite mostrar una burbujita encima del Pin del MAPA con la direccion\r\n        \r\n        //Llenar Campos del Dom\r\n        document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';\r\n        document.querySelector('#calle').value = resultado?.address?.Address ?? '';\r\n        document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';\r\n        document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';\r\n        })\r\n    })\r\n\r\n    \r\n\r\n})()\n\n//# sourceURL=webpack://project-bienes-raicez/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;