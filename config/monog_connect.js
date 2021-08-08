const mongoose = require('mongoose');
const {
    MONGO_PASSWORD,
    MONGO_USER,
    MONGO_HOST,
    MONGO_HTTP,
    MONGO_DB
} = process.env

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }

async function MongoConnect(){
    try{
        await mongoose.connection.close();
        const url = `${MONGO_HTTP}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?authSource=admin&compressors=zlib&retryWrites=true&w=majority&ssl=true`;
        console.log(url, "Mongo Connection String")
        const client = await mongoose.connect(url, dbOptions);
        console.log("Connection with Mongo is formed")
        return client;
    }catch(error){
        console.log("Error while connecting Mongo, Cloud Mongo will expire in 7 days")
        console.log("Error :", error)
        return null;
    }
}

exports.connect = (async function(){
    const client = await MongoConnect();
    return function(){
        return client
    }
})()