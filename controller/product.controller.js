const Product = require('../models/product.model');


//get all the products
const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

};

const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createPoduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);        
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const userReq = req.body;
        const product = await Product.findByIdAndUpdate(id,userReq);
        if(!product)
        {
            return res.status(404).json({message: "Product Not Found"});
        }
        const updatedproduct = await Product.findById(id);
        //res.status(200).json(updatedproduct);
        res.status(200).json({message:"Updated succesfully"});
    } catch (error) {
        res.status(500).json({message:error.message});    
    }
};

const deleteProduct = async(req, res) => {
    try {
        const {id}= req.params;
        const userReq = req.body;
        const product = await Product.findByIdAndDelete(id,userReq);
    
        if(!product)
        {
            return res.status(404).json({message: "Product Not Found"});  
        }
    
        res.status(200).json({message:"Product deleted successfully"});
    
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

module.exports = {
    getProducts,
    getProduct,
    createPoduct,
    updateProduct, 
    deleteProduct
}