const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI);
        console.log("Mongodb connected")
    } catch(error) {
        console.log(error)
        throw error;
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect();
    } catch(error) {
        console.log(error)
        throw error;
    }
}

const models = {
    User: require("./models/User"),
    Product: require("./models/Product"),
    Category: require("./models/Category"),
} 

module.exports = {
    connect, 
    disconnect,
    ...models,
}