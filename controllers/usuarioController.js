

const formularioLogin = (req,res) => {
    res.render('auth/login',{
        pagina: "Inciar Sesion"
    });
}

const formularioRegistro = (req,res) => {
    res.render('auth/registro',{
       pagina: "Crear Cuenta"
    });
}

const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password',{
       pagina: "Recupera tus accesos a Bienes Raices"
    });
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword
}