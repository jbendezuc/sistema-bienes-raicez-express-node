import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Jose',
        email: 'jose@jose.com',
        password: bcrypt.hashSync('password',10),
        confirmado: 1
    }
];

export default usuarios;