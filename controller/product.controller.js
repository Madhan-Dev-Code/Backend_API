const Product = require('../models/product.model');


//get all the products
const getProducts = async (req,res) => {
    try {
        let query = {};
        let {order,productName} = req.query;
        let sortOrder;
        if(productName)
        {
            query.name = new RegExp(productName, 'i'); 
        }
        if(order)
        {
            switch (order) {
                case 'asc':
                    sortOrder = { price: 1 }; // Low to high
                    break;
                case 'desc':
                    sortOrder = { price: -1 }; // High to low
                    break;
                case 'quantityAsc':
                    sortOrder = {quantity : 1};    
                    break;
                case 'quantityDsc':
                    sortOrder = { quantity : -1};
                    break;
                    default:
                    return res.status(400).json({
                        message: "Invalid 'order' parameter. Use 'asc' for low to high or 'desc' for high to low.",
                    });
            }

        }
        const products = await Product.find(query).sort(sortOrder);
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

};

//get the product based on the Id

const getProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//Create the product

const createPoduct = async (req, res) => {
    try {
        if(req.body.name.length < 5 )
        {
            return res.status(400).json({error: "Name of the char should be above 6"});
        }
        else if(req.body.quantity < 3)
        {
            return res.status(400).json({error:"Quantity should be more than 2"});
        }
        const product = await Product.create({name:req.body.name, quantity:req.body.quantity});
        res.status(200).json(product);        
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update the product by id

const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const userReq = req.body;

        if (Object.keys(userReq).length === 0) {
            return res.status(400).json({ message: "No fields provided for update." });
        }
        const product = await Product.findByIdAndUpdate(id,userReq,{new:true});
        if(!product)
        {
            return res.status(404).json({message: "Product Not Found"});
        }
        //res.status(200).json(updatedproduct);
        res.status(200).json({message:"Updated succesfully", updatedProduct: product});
    } catch (error) {
        res.status(500).json({message:error.message});    
    }
};

//delete the product by Id

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
// const getProductsSortedByPrice = async (req, res) => {
//     try {

//         const { order } = req.query; // Retrieve the 'order' query parameter

//         let sortOrder;

//         // Use a switch case to determine sort order
//         switch (order) {
//             case 'asc':
//                 sortOrder = { price: 1 }; // Low to high
//                 break;
//             case 'desc':
//                 sortOrder = { price: -1 }; // High to low
//                 break;
//             case 'quantityAsc':
//                 sortOrder = {quantity : 1};    
//                 break;
//             case 'quantityDsc':
//                 sortOrder = { quantity : -1};
//                 break;
//                 default:
//                 return res.status(400).json({
//                     message: "Invalid 'order' parameter. Use 'asc' for low to high or 'desc' for high to low.",
//                 });
//         }

//         // Fetch and sort products from the database
//         const products = await Product.find().sort(sortOrder);
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Error fetching sorted products:', error);
//         res.status(500).json({ message: error.message });
//     }
// };


module.exports = {
    getProducts,
    getProduct,
    createPoduct,
    updateProduct, 
    deleteProduct

}