const mongoose = require('mongoose');



 const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN );

        console.log('Base de datos conectada con éxito')



    } catch (error) {

        console.log(error);
        throw new Error('Error al inicializar la base de datos');



    }


 }


 module.exports = {
    dbConnection,
 }