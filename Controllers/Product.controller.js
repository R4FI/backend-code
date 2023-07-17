const uploader = require("../Middlewire/uploader");
const {
  getProductsService,
  createProductsService,
  updateProducts,
  bulkUpdateServices,
  deleteProduct,
  getSingleProductsService,
  updateUser,
} = require("../Services/product.service");
const fs = require("fs");
const path = require("path");
exports.getProducts = async (req, res) => {
  try {
    //filtering
    let filters = { ...req.query };

    // sort,page,limit->exclude
    // gt,lt,gte,lte
    let filtrSring = JSON.stringify(filters);
    filtrSring = filtrSring.replace(
      /\b(gt|lt|gte|lte)\b/,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtrSring);

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.field) {
      const field = req.query.field.split(",").join(" ");
      queries.field = field;
    }
    const prodcuts = await getProductsService(filters, queries);
    res.status(200).json({
      status: "success",
      message: "all products",
      data: prodcuts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "cannot get data",
      error: error.message,
    });
  }
};

// get single products
exports.singleProductGet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSingleProductsService(id);
    res.status(200).json({
      status: "success",
      message: "successfully get single product",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not get the product",
      error: error.message,
    });
  }
};

// File upload settings
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         const fileName = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.includes('image')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// }

exports.createProducts = async (req, res, next) => {
  try {
    // Wrap the file upload and product creation logic in an async function
    const uploadAndCreateProduct = async () => {
      // Upload file
      return new Promise((resolve, reject) => {
        uploader.single("image")(req, res, async (err) => {
          if (err) {
            reject(err);
          } else {
            try {
              const product = {
                name: req.body.name,
                description: req.body.description,
                categories: req.body.categories,
                price: req.body.price,
                image: Buffer.from(fs.readFileSync(req.file.path)).toString(
                  "base64"
                ),
                contentType: req.file.mimetype,
                // status: req.body.quantity == 0 ? 'out-of-stock' : 'in-stock'
              };

              const result = await createProductsService(product);

              resolve(result);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    };

    const result = await uploadAndCreateProduct();

    // Send the base64 encoded image as part of the response
    const base64Image = `data:${result.contentType};base64,${result.image}`;

    res.status(200).json({
      status: "success",
      message: "Data Inserted Successfully",
      data: { ...result, image: base64Image },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not Inserted",
      error: error.message,
    });
  }
};

// exports.createProducts = async(req,res,next)=>{

//     try{
//         const result = await createProductsService(req.body);

//         if(Product.quantity == 0){
//             Product.status = 'out-of-stock'
//         }

//     // save and create
//     // const product = new Product(req.body)
//     // const result =  await  product.save()

//         res.status(200).json({
//             status:'success',
//             message:'Data Inserted Sucessfully',
//             data: result
//         })

//     }
//     catch(error){
//             res.status(400).json({
//                 status: 'fail',
//                 message: 'Data is not Inserted',
//                 error: error.message

//             })
//     }

// }

exports.updateProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProducts(id, req.body, {
      image: Buffer.from(fs.readFileSync(req.file.path)).toString("base64"),
    });
    const base64Image = `data:${result.contentType};base64,${result.image}`;
    res.status(200).json({
      status: "success",
      message: "successfully updated",
      data: { ...result, base64Image },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not update the product",
      error: error.message,
    });
  }
};

exports.bulkupdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateServices(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not update the product",
      error: error.message,
    });
  }
};

// delete
exports.deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "could not delete",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not delete the product",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.file);
  } catch (error) {}
};
