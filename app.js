const express = require('express');
const app = express();
const cors = require ('cors');


// middlewires
app.use(cors());
app.use(express.json());

// routes
const userRoute = require('./Routes/user.route')
const productRoute = require('./Routes/product.route');

app.get("/",(req,res)=>{
    res.send("wooohooooooo!Route is working");

});
// posting  & getting
app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)

// update

module.exports = app;