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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n    //Usamos || porque el valor no es Null sino Vacio ''\r\n    const lat = -11.985492;\r\n    const lng = -77.099778;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);            //Instacia el mapa y le guarda el div con id MAPA\r\n\r\n    //Seleccionamos catgorias y precios del DOM\r\n    const selectCategoria = document.querySelector('#categorias');\r\n    const selectPrecio = document.querySelector('#precios');\r\n\r\n    //Propiedaeds vacio inicialize\r\n    let propiedades = [];\r\n    \r\n    //Filtros vacios\r\n    const filtros = {\r\n        categoria : '',\r\n        precio : ''\r\n    };\r\n\r\n    // https://leafletjs.com/examples/quick-start/              => Pagina para encontrar la Documentacion\r\n    let markers = new L.FeatureGroup().addTo(mapa)              //=> Creamos un grupo de markers, agruparlos y poder tener la opcion de aplciar metodos en grupo en el mapa\r\n\r\n    //Esta permite que se muestre los mapas/(NECESARIO)\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    const obtenerPropiedades = async () =>{\r\n        try {\r\n            const url = '/api/propiedades';\r\n            const respuesta = await fetch(url);\r\n            propiedades = await respuesta.json();\r\n            \r\n             mostrarPropiedades(propiedades);\r\n\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    //Detectar si elegieron un SELECT CATEGORIA - PRECIO\r\n    selectCategoria.addEventListener('change', e => {\r\n        filtros.categoria = +e.target.value     //transforma en numeral\r\n        filtrarPropiedades();\r\n    })\r\n\r\n    selectPrecio.addEventListener('change', e => {\r\n        filtros.precio = +e.target.value     //transforma en numeral\r\n        filtrarPropiedades();\r\n    })\r\n\r\n    const mostrarPropiedades = (propiedades) => {\r\n        \r\n        //Limpiar Pines, gracias a FeatureGroup\r\n        markers.clearLayers();\r\n\r\n        propiedades.forEach( propiedad => {\r\n            \r\n                const marker = new L.marker([propiedad?.lat, propiedad?.lng],{\r\n                autoPan: true\r\n            }).addTo(mapa).bindPopup(`\r\n                <p class=\"text-indigo-600 font-bold\">${propiedad.categoria.nombre}</p>\r\n                <h1 class=\"text-xl font-extrabold uppercase my-2\">${propiedad?.titulo}</h1>\r\n                <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la propiedad ${propiedad.titulo} \"/>\r\n                <p class=\"text-gray-600 font-bold\">${propiedad.precio.nombre}</p>\r\n                <a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 text-white block p-2 text-center font-bold uppercase\"> Ver Propiedad</a> \r\n\r\n                `)\r\n            \r\n            markers.addLayer(marker);       //Agrega los markers creados, para poder ser limpiados con otro metodo\r\n        });\r\n\r\n        \r\n\r\n    }\r\n\r\n    const filtrarPropiedades = () => {\r\n        //const resultado = propiedades.filter(propiedad => (propiedad.categoriaID === filtros.categoria ));\r\n        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio);\r\n        mostrarPropiedades(resultado);\r\n    }\r\n\r\n    const filtrarCategoria = (propiedad) => {\r\n        return filtros.categoria ? filtros.categoria === propiedad.categoriaID : propiedad\r\n    }\r\n\r\n    const filtrarPrecio = (propiedad) => {\r\n        return filtros.precio ? filtros.precio === propiedad.precioID : propiedad\r\n    }\r\n\r\n    obtenerPropiedades();\r\n})()\n\n//# sourceURL=webpack://project-bienes-raicez/./src/js/mapaInicio.js?");

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
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;