const ProductModel = require("../model/ProductModel");
const {scrapeDomains, scrapeWebsite} = require("./scrape");
class ProductController{
    async scrape(req, res){
        try{
            const scrapeData = await scrapeWebsite(scrapeDomains);
            await ProductModel.deleteMany({});
            const result = await ProductModel.create(scrapeData);
            res.status(200).send(result);
        }
        catch(error){
            console.log(error);
            res.status(500).send()
        }
    }
}

module.exports = new ProductController()