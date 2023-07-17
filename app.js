const express = require('express');
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');

// middlewires
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '1000mb' }));

// routes
const userRoute = require('./Routes/user.route')
const productRoute = require('./Routes/product.route');
const orderRoute = require('./Routes/order.routes');

app.get("/",(req,res)=>{
    res.send("wooohooooooo!Route is working");

});
// posting  & getting
app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/orders',orderRoute);

// update

module.exports = app;