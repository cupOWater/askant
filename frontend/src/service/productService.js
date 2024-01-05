import instance from './apiConfig';

class ProductService {
    async getAllProducts() {
        try{
            const res = await instance.get("/products");
            return res;
        } catch(error){
            return error;
        }
    }
}

export const productService = new ProductService();