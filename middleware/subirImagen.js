import multer from 'multer';
import path from 'path';
import {generarId} from '../helpers/tokens.js';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/uploads/')    //Ubicacion de la carga de los archivos
    },
    filename: function(req,file,cb){
        cb(null,generarId() + path.extname( file.originalname) )    //creando un nombre para el archivo
    }
})

const upload = multer({ storage })

export default upload;