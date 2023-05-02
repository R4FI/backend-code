const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

mongoose.connect(process.env.DATABASE_SERVER).then(()=>{
    console.log('Database Connection is successful');

});

// server
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})