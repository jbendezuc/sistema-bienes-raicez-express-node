import nodemailer from 'nodemailer';

const emailRegistro = async(datos) => {
    //Configuracion para Logear en EmailTrap
    const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });

    const {nombre,email,token} = datos;

    //Enviar Email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en Bienes Raices',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices</p>

            <p>Tu cuenta esta lista, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmacion/${token}">Confirmar Cuenta</a></p>

            <p>Si tu no creaste la cuenta, puedes ignora el mensaje</p>
        `
    })
}

const emailOlvidePassword = async(datos) => {
    //Configuracion para Logear en EmailTrap
    const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });

    const {nombre,email,token} = datos;

    //Enviar Email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma Restaurancion de Password de tu Cuenta en BienesRaices.com',
        text: 'Confirma la Restaurancion de Password de tu Cuenta en Bienes Raices',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices</p>

            <p>Restaura tu password, solo debes confirmar en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restaurar Password</a></p>

            <p>Si tu no solicitaste la restauracion, puedes ignora el mensaje</p>
        `
    })
}

export { 
    emailRegistro,
    emailOlvidePassword
}

