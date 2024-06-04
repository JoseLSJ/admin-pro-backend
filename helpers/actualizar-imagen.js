const fs = require('fs');

const Usuario  = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico   = require('../models/medico');

const borrarimagen = ( path ) => {

    if (fs.existsSync( path ) ) {
        // Borrar img anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo =  '';
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log("No hay medico en ese id");
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarimagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
    
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log("No hay hospital en ese id");
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarimagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log("No hay usuario en ese id");
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarimagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

        default:
            break;
    }

}

module.exports = {
    actualizarImagen
};