const Product = require("../model/ProductModel");

class ProductController{
    async getAllProducts(req, res){
        try {
            const data = await Product.find()
            // console.log('hello');
            console.log(res.data);
            return res.status(200).send(data);
            
        } catch(error){
            console.log(error);
            return res.status(500).send();
        }
    }
}
module.exports = new ProductController()