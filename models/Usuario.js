import { DataTypes } from "sequelize";
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuario = db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
},{
    hooks:{                     //Funciones que se pueden agregar al Modelo
        beforeCreate: async function (usuario) {
            //Hashear PASSWORDs
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password,salt);
        }
    },
    scopes:{                    //Funcion para eliminar datos cuando hacemos consultas con el Modelo
        eliminarPassword: {
            attributes: {
                exclude: ['password','token','confirmado','createdAt','updatedAt']
            }
        }
    }
})

//Validar el password hasheado con el plano, Creamos un prototype llamado verificarPassword
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

export default Usuario;