const Product = require('../Models/Products');
const {getProductsService,createProductsService, updateProducts, bulkUpdateServices,deleteProductService, deleteProduct, getSingleProductsService} = require("../Services/product.service");

exports.getProducts = async(req,res)=>{
    try{
       
        //filtering
        let filters = {...req.query}
        
        // sort,page,limit->exclude
        // gt,lt,gte,lte
        let filtrSring=JSON.stringify(filters)
        filtrSring = filtrSring.replace(/\b(gt|lt|gte|lte)\b/,match=>`$${match}`)
            filters= JSON.parse(filtrSring)

        const excludeFields = ['sort','page','limit']
        excludeFields.forEach(field=>delete filters[field])
        const queries = {}
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
        }
        if(req.query.field){
            const field = req.query.field.split(',').join(' ')
            queries.field = field
        }
            const prodcuts = await getProductsService(filters,queries)
            res.status(200).json({
                status:"success",
                message:"all products",
                data: prodcuts
            })
        }
    catch(error){
            res.status(400).json({
            status:"fail",
            message:"cannot get data",
            error: error.message,
            })
            
        }
}

// get single products
exports.singleProductGet = async(req,res,next)=>{
    try{
        const {id} = req.params
         const result = await getSingleProductsService(id);
         res.status(200).json({
             status:"success" ,
             message:"successfully get single product",
             data:result
         })
 
     }
     catch(error){
         res.status(400).json({
             status: "fail",
             message: "Could not get the product",
             error: error.message
 
         })
 
     }

}

exports.createProducts = async(req,res,next)=>{ 
    
    try{
        const result = await createProductsService(req.body)
        if(Product.quantity == 0){
            Product.status = 'out-of-stock'
        }
      
    // save and create
    // const product = new Product(req.body)
    // const result =  await  product.save()
        res.status(200).json({
            status:'success',
            message:'Data Inserted Sucessfully',
            data: result
        })

    }
    catch(error){
            res.status(400).json({
                status: 'fail',
                message: 'Data is not Inserted',
                error: error.message

            })
    }

}

exports.updateProducts= async(req,res,next)=>{
    try{
        const {id} = req.params;
        const result = await updateProducts(id,req.body);
        res.status(200).json({
            status:"success" ,
            message:"successfully updated"
        })

    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Could not update the product',
            error: error.message

        })

    }
}
exports.bulkupdateProducts = async(req,res,next)=>{
    try{
        const result = await bulkUpdateServices(req.body);
        res.status(200).json({
            status:"success" ,
            message:"successfully updated"
        })

    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Could not update the product',
            error: error.message

        })

    }
};


// delete
exports.deleteProducts = async(req,res,next)=>{
    try{
       const {id} = req.params
        const result = await deleteProduct(id);
        if(!result.deletedCount){
            return res.status(400).json({
                status:"fail",
                error:"could not delete"
            })
        }
        res.status(200).json({
            status:"success" ,
            message:"successfully deleted"
        })

    }
    catch(error){
        res.status(400).json({
            status: "fail",
            message: "Could not delete the product",
            error: error.message

        })

    }
};
 
exports.fileUpload= async(req,res,)=>{
    try{
        res.status(200).json(req.file)
    }
    catch(error){
    }
}
