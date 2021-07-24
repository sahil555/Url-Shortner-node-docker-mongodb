const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://db:27017', {
            useCreateIndex:true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology:true,
            user: 'express-user',
            pass: 'password_is_tough'
        });
        console.log("Connected to DB");
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;