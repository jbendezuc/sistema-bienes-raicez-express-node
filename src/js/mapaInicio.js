(function() {

    //Usamos || porque el valor no es Null sino Vacio ''
    const lat = -11.985492;
    const lng = -77.099778;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);            //Instacia el mapa y le guarda el div con id MAPA

    //Seleccionamos catgorias y precios del DOM
    const selectCategoria = document.querySelector('#categorias');
    const selectPrecio = document.querySelector('#precios');

    //Propiedaeds vacio inicialize
    let propiedades = [];
    
    //Filtros vacios
    const filtros = {
        categoria : '',
        precio : ''
    };

    // https://leafletjs.com/examples/quick-start/              => Pagina para encontrar la Documentacion
    let markers = new L.FeatureGroup().addTo(mapa)              //=> Creamos un grupo de markers, agruparlos y poder tener la opcion de aplciar metodos en grupo en el mapa

    //Esta permite que se muestre los mapas/(NECESARIO)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () =>{
        try {
            const url = '/api/propiedades';
            const respuesta = await fetch(url);
            propiedades = await respuesta.json();
            
             mostrarPropiedades(propiedades);

        } catch (error) {
            console.log(error)
        }
    }

    //Detectar si elegieron un SELECT CATEGORIA - PRECIO
    selectCategoria.addEventListener('change', e => {
        filtros.categoria = +e.target.value     //transforma en numeral
        filtrarPropiedades();
    })

    selectPrecio.addEventListener('change', e => {
        filtros.precio = +e.target.value     //transforma en numeral
        filtrarPropiedades();
    })

    const mostrarPropiedades = (propiedades) => {
        
        //Limpiar Pines, gracias a FeatureGroup
        markers.clearLayers();

        propiedades.forEach( propiedad => {
            
                const marker = new L.marker([propiedad?.lat, propiedad?.lng],{
                autoPan: true
            }).addTo(mapa).bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
                <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad.titulo} "/>
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 text-white block p-2 text-center font-bold uppercase"> Ver Propiedad</a> 

                `)
            
            markers.addLayer(marker);       //Agrega los markers creados, para poder ser limpiados con otro metodo
        });

        

    }

    const filtrarPropiedades = () => {
        //const resultado = propiedades.filter(propiedad => (propiedad.categoriaID === filtros.categoria ));
        const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio);
        mostrarPropiedades(resultado);
    }

    const filtrarCategoria = (propiedad) => {
        return filtros.categoria ? filtros.categoria === propiedad.categoriaID : propiedad
    }

    const filtrarPrecio = (propiedad) => {
        return filtros.precio ? filtros.precio === propiedad.precioID : propiedad
    }

    obtenerPropiedades();
})()