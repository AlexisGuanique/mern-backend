const { response } = require('express');
const Evento = require('../models/Evento');


// Logica de nuestros endpoints

//*OBTENER EVENTO
const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');


    res.status(201).json({
        ok: true,
        eventos,
    })
};

//* CREAR EVENTO
const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

//* ACTUALIZAR EVENTO
const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        //! Verificamos si el evento existe buscandolo por su id
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        //! Verificamos si el usuario que quiere editar el evento fue quien lo creó
        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No tiene provilegios de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado

        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

};

//* BORRAR EVENTO

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        //! Verificamos si el evento existe buscandolo por su id
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            })
        }

        //! Verificamos si el usuario que quiere editar el evento fue quien lo creó
        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: 'No tiene provilegios de eliminar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}

