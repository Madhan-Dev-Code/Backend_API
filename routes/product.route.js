const express = require('express');
const router = express.Router();
const Product = require('../models/product.model.js');
const {getProducts,getProduct,createPoduct,updateProduct, deleteProduct} = require('../controller/product.controller.js');

//router.get('/sort',getProductsSortedByPrice);
router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',createPoduct);
router.patch('/:id',updateProduct);
router.delete('/:id',deleteProduct);



module.exports = router;
