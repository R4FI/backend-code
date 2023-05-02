const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const productController= require('../Controllers/Product.controller');
const UPLOAD = 'uploads/';
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,UPLOAD);
    },
    filename:(req,file,cb)=>{
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                            .replace(fileExt, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-")+ "-"+Date.now();
                            cb(null,fileName+fileExt);
    },
})
var upload = multer({
   storage: storage,
    limits:{
        fileSize:5000000,
    },
    fileFilter:(req,file,cb)=>{
            if(file.mimetype === 'image/png' || 'image/jpg' || 'image/jpeg')
            {
                cb(null,true);
            }
            else{
                cb(new Error('Image Must Be JPG/PNG/JPEG'))
            }
    }
});
// product route
router.route('/')
.post(upload.single('avatar'),productController.createProducts)
.get(productController.getProducts)

router.route('/').delete(productController.deleteProducts)
// bulk update
router.route('/bulk-update')
.patch(productController.bulkupdateProducts);

router.route("/:id")
.get(productController.singleProductGet)
.patch(productController.updateProducts)
.delete(productController.deleteProducts)




module.exports = router;
