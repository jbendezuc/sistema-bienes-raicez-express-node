
(function() {
    //Usamos || porque el valor no es Null sino Vacio ''
    const lat = document.querySelector('#lat').value || -11.985492;
    const lng = document.querySelector('#lng').value || -77.099778;
    const mapa = L.map('mapa').setView([lat, lng ], 16);            //Instacia el mapa y le guarda el div con id MAPA
    let marker;

    // https://leafletjs.com/examples/quick-start/              => Pagina para encontrar la Documentacion
    //Utiliar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();       //Instanciamos, geocodeServices, esto lo obtenemos de los SCRIPT

    //Esta permite que se muestre los mapas/(NECESARIO)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


    //El Pin
    marker = new L.marker([lat,lng],{
        draggable: true,    //permite mover el pin
        autoPan: true       //Permite mover la pantalla mientras el pin se desplaza
    }).addTo(mapa);

    //Detectar el Movimiento del Pin
    marker.on('moveend', function(e){
        marker = e.target           //capturamos todo los datos del ultimo vomiento del mouse
        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))        //permite el panTo que la pantalla se oriente automatico alrededor del Pin
    
        //Obtener la informacion de las calles al soltar el pin
        geocodeService.reverse().latlng(posicion,16).run(function(error,resultado){     //Permite de acuerdo a las coordenadads mostrar los nombres de las calles
            marker.bindPopup(resultado.address.LongLabel)                               // Permite mostrar una burbujita encima del Pin del MAPA con la direccion
        
        //Llenar Campos del Dom
        document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
        document.querySelector('#calle').value = resultado?.address?.Address ?? '';
        document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
        document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })

    

})()