const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')


// Logica de nuestros endpoints

//* CREAR USUARIO
const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //* Validamos si existe un correo igual en la db
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo electronico',
            })
        }

        //* Indicamos lo que vamos a guardar
        usuario = new Usuario(req.body)


        //* Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //* Guardamos en la base de datos
        await usuario.save();

        //* Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })

    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

};




//* LOGIN DE USUARIO 
const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //* Validamos si existe un correo igual en la db
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            })
        }

        //* Confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //* Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })



    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};


//* REVALIDAR TOKEN
const revalidarToken = async(req, res = response) => {

    const {uid, name } = req;


    //* Generar JWT
    const token = await generarJWT(uid, name)


    res.json({
        ok: true,
        uid,
        name,
        token
    })
};



// Exportaciones

module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario,
}