const mongoose = require('mongoose')
const { MONGO_URL } = process.env

exports.connect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Connected...");
        }).catch(err => {
            console.error('Error connecting...');
            console.error(err);
            process.exit(1)
        })
}