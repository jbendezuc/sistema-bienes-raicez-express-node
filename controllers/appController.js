
import { Sequelize } from 'sequelize';
import {Precio, Categoria, Propiedad} from '../models/index.js'

const inicio = async (req,res) => {

    const [categorias, precios, casas, departamentos ] = await Promise.all([
        Categoria.findAll({raw: true}),  //Permite traer datos simples para ser utilizados, pero no permite utilizar metodos con esas respuestas, categoria.save() 
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 1     //buscaremos por categoria especifica
            },
            include:[
                {
                    model: Precio, as: 'precio'
                }
            ], 
            order: [['createdAt', 'DESC']]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaID: 2     //buscaremos por categoria especifica
            },
            include:[
                {
                    model: Precio, as: 'precio'
                }
            ], 
            order: [['createdAt', 'DESC']]
        })
    ])


    res.render('inicio',{
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        departamentos,
        csrfToken: req.csrfToken(),
    });
}

const categoria = async (req,res) => {

    const {id} = req.params;
    
    const categoria = await Categoria.findByPk(id)
    
    if(!categoria){
        return res.redirect('/404')
    }

    const propiedades = await Propiedad.findAll({
            where:{
                categoriaID: id
            },
            include:[
                {model: Precio, as: 'precio'}
            ]
        });
  
    res.render('categoria',{
        pagina: `${categoria.nombre}s en Venta`,
        propiedades,
        csrfToken: req.csrfToken(),
    })

}

const noEncontrado = (req,res) => {
    res.render('404',{
        pagina: 'Pagina no Encontrada',
        csrfToken: req.csrfToken(),
    })
}

const buscador = async(req,res) => {
    const { termino } = req.body;

    //Validar Termino no este vacio
    console.log(termino.trim());

    if(!termino.trim())
    {
        return res.redirect('/404')     //RETORNA A LA PAGINA ANTERIOR
    }
    
    //Consultar las Propiedades
    const propiedades = await Propiedad.findAll({
        where:{
            titulo:{
                [Sequelize.Op.like] : '%' + termino.trim() + '%'       //PERMITE HACER busquedas por el termino, importar Sequelize
            }
        },
        include:[
            {model: Precio, as: 'precio'}
        ]
    })

    res.render('busqueda',{
        pagina: 'Resultados de la Pagina',
        propiedades,
        csrfToken: req.csrfToken()
    })
}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}