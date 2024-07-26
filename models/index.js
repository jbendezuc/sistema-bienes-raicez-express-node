import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";
import Mensaje from "./Mensaje.js";

//RELACIONES DE TABLAS

//Precio.hasOne(Propiedad);
//Categoria.hasOne(Propiedad);
//Usuario.hasMany(Propiedad);
//Otra Forma Relacion 1:1 editando el foreignKey //RELACION PROPIEDAD (incorporando un campo foreign)
Propiedad.belongsTo(Precio,{foreignKey:'precioID'});
Propiedad.belongsTo(Categoria,{foreignKey:'categoriaID'});
Propiedad.belongsTo(Usuario,{foreignKey:'usuarioID'});
Propiedad.hasMany(Mensaje,{foreignKey:'propiedadID'}); // RELACION INVERSA, indicando que una Propiedad tiene muchos mensajes, 
                                                    //conectando la tabla de PROPIEDAD-MENSAJE con el mismo foreignKey de la otra RELACION


//RELACION MENSAJE (incorporando un campo foreign)
Mensaje.belongsTo(Propiedad,{foreignKey:'propiedadID'});
Mensaje.belongsTo(Usuario,{foreignKey:'usuarioID'});


export {
    Categoria,
    Precio,
    Propiedad,
    Usuario,
    Mensaje
}
