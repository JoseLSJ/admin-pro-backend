const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        //Verificar email
        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar token -JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con le administrador"
        });
    }
}

const googleSingIn = async (req, res = response) => {

    try {
     
        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne( {email} );
        let usuario;

        // Verifica si el usuario existe en la DB y si no lo crea
        if( !usuarioDB ){
            usuario = new Usuario({ 
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email,
            name,
            picture,
            token,
            menu: getMenuFrontEnd( usuario.role )
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        }); 
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid

    // Generar token
    const token = await generarJWT( uid );


    //Obtener el usuario por id
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    })

}

module.exports = {
    login,
    googleSingIn,
    renewToken
}