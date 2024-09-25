const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/APIFeatures");

//create product - admin.
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});

//get all products
exports.getAllProducts = catchAsyncErrors( async (req,res)=>{

    //for changing number of products per page
    resultsPerPage = 20;
    //to show in dashboard in frontend
    productCount = await Product.countDocuments();

    //first in query we give in what to find, and in querystr, what to find.
    const apiFeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);

    const products = await apiFeature.query;

    res.status(201).json({
        success:true,
        products
    });
});

//get product details
exports.getProductDetails = catchAsyncErrors( async (req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product,
        productCount
    })

});


//update product
exports.updateProduct = catchAsyncErrors( async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });

});

//delete product
exports.deleteProduct = catchAsyncErrors( async (req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted succesfully"
    })

});