import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";

//RELACIONES DE TABLAS

//Precio.hasOne(Propiedad);
//Categoria.hasOne(Propiedad);
//Usuario.hasMany(Propiedad);
//Otra Forma Relacion 1:1 editando el foreignKey
Propiedad.belongsTo(Precio,{foreignKey:'precioID'});
Propiedad.belongsTo(Categoria,{foreignKey:'categoriaID'});
Propiedad.belongsTo(Usuario,{foreignKey:'usuarioID'});



export {
    Categoria,
    Precio,
    Propiedad,
    Usuario
}
