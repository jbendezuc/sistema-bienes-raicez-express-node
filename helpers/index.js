
const esVendedor = (usuarioID, propiedadUsuarioID) => {

    return usuarioID === propiedadUsuarioID;
}

const formatearFecha = (fecha) =>{
    
    //Transformar la fecha en String
    const nuevaFecha = new Date(fecha).toISOString().slice(0,10);
    
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones )
}

export {
    esVendedor,
    formatearFecha
}