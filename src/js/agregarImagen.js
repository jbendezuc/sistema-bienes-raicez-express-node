import { Dropzone } from 'dropzone'

//Extraemos el Token de Formulario del Head, de la etiqueta Meta
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


Dropzone.options.imagen = {
    dictDefaultMessage: 'Sube tus imagenes aquí',   // mensaje de subir img
    acceptedFiles: '.png, .jpg, .jpeg', // formato aceptado de imagenes
    maxFilesize: 5,                     // maximo de tamaño de la imagen
    maxFiles: 1,                        // maximo de cantidad de imagenes
    parallelUploads: 1,                 // maximo de cantidad de imagenes soportado
    autoProcessQueue: false,            // que no se cargue de automatico, sino por un click
    addRemoveLinks: true,               // boton de remover la imagen
    dictRemoveFile: 'Borrar Archivo',   // mensaje de borrar la imagen
    dictMaxFilesExceeded: 'El limite es 1 Archivo',  //mensaje del limite de imagenes
    headers:{                           // pasarle el Token CSRF traido del Header
        'CSRF-Token': token
    },
    paramName: 'imagen',
    init: function(){
        const dropzone = this;
        const btnPublicar = document.querySelector('#publicar');

        btnPublicar.addEventListener('click', function(){
            dropzone.processQueue();                //Carga de los archivos en el form hacia el servidor
        })

        dropzone.on('queuecomplete', function(){        //Se ejecuta la funcion cuando termino de cargarse todo los archivos
            if(dropzone.getActiveFiles().length == 0){   //Significa que no hay archivos en Cola
                window.location.href = '/mis-propiedades'
            }
        })
    }
}