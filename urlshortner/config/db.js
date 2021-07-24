const mongoose = require("mongoose");



// function to setup a connection to mongodb database

const connectDB = async () => {

    // using try catch block incase of any exception happen in connection to DBs

    try{
        await mongoose.connect('mongodb://db:27017', {
            useCreateIndex:true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology:true,
            user: 'express-user',
            pass: 'password_is_tough'
        });

        // alert that server is connected to DB

        console.log("Connected to DB");

        // incase of any catch 

    }catch(err){
        console.error(err.message);
    }
}

// exporting the module

module.exports = connectDB;