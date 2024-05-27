const mongoose = require('mongoose');
require('dotenv').config();

//Usuario mongo
// mean_user
// f9268S5cUu3aJtbv

const dbConnection = async () => {
    
    try{
        await mongoose.connect(process.env.DB_CNN);

        console.log("DB Online");
    }catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la BD");
    }
}

module.exports = {
    dbConnection
}