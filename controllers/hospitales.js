const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate("usuario", "nombre img");

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
                                    usuario: uid,
                                    ...req.body 
                                 });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const actualizarHospitales = async (req, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( hospitalId );

        if( !hospital ){
            return res.status(404).json({
                        ok: false,
                        msg: "Hospital no encontrado por id"
                    });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }

}

const borrarHospitales = async (req, res = response) => {

    const hospitalId = req.params.id;

    try {

        const hospital = await Hospital.findById( hospitalId );

        if( !hospital ){
            return res.status(404).json({
                        ok: false,
                        msg: "Hospital no encontrado por id"
                    });
        }

        await Hospital.findByIdAndDelete( hospitalId );

        res.json({
            ok: true,
            msg: "Hospital elimiado"
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: "Hable con el administrador"
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospitales,
    borrarHospitales
}