// console.log("hello Therr"); // printing the message in the terminal - node index.js - running command
const express = require('express'); // import the expresss library in to our local
const mongoose = require('mongoose');
const app = express();
const Product = require('./models/product.model');
const productRoute = require('./routes/product.route');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/products", productRoute);

// // get method

// app.get('/',(req,res)=>{
// res.send("Responce from backend API");
// });

// app.get('/api/products',async (req,res)=>{
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({message: error.message});
        
//     }
// });

// app.get('/api/products/:id', async(req,res)=> {
// try {
//     const {id} = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);

// } catch (error) {
//     res.status(500).json({message: error.message});
// }
// });

// app.post('/api/products', async (req,res)=> {
//     try {
//         const product = await Product.create(req.body);
//         res.status(200).json(product);        
        
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// app.put('/api/products/:id',async (req, res) => {
// try {
//     const {id} = req.params;
//     const userReq = req.body;
//     const product = await Product.findByIdAndUpdate(id,userReq);
//     if(!product)
//     {
//         return res.status(404).json({message: "Product Not Found"});
//     }
//     const updatedproduct = await Product.findById(id);
//     res.status(200).json(updatedproduct);
    
// } catch (error) {
//     res.status(500).json({message:error.message});    
// }
// });

//delele method

// app.delete('/api/products/:id', async(req, res)=>{
// try {
//     const {id}= req.params;
//     const userReq = req.body;
//     const product = await Product.findByIdAndDelete(id,userReq);

//     if(!product)
//     {
//         return res.status(404).json({message: "Product Not Found"});  
//     }

//     res.status(200).json({message:"Product deleted successfully"});

    
// } catch (error) {
//     res.status(500).json({message:error.message});
// }
// });

mongoose.connect("mongodb+srv://Mymangodb:Mymangodb@backendapi.aho0r.mongodb.net/Node-api?retryWrites=true&w=majority&appName=BACKENDAPI")
.then(()=> {
    console.log("DB Connected Successfully");
    app.listen(4200, ()=> {
        console.log("Port 4200 is listening");
        
    });
})
.catch(() => {
console.log("DB Not Connected");
});
