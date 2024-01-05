const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: String},
    img: {type: String},
    domain: {type: String},
    category: {type: String, enum: ['Ant', 'Tank', 'Supply']},
    link: {type: String}
})

module.exports = mongoose.model("product", productSchema)