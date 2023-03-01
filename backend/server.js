const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const userRoute = require('./routes/user-route');
const productRoute = require('./routes/product-route')
const tagRoute = require('./routes/tag-route')
const  mongoose  = require('mongoose');
const dotenv = require('dotenv').config()
const app = express()


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/static/images', express.static(path.join('static', 'images')));
app.use('/uploads/images/users-images', express.static(path.join('uploads', 'images','users-images')));
app.use('/uploads/images/product-images', express.static(path.join('uploads', 'images','product-images')));

app.use('/uploads/images', express.static(path.join('uploads', 'images')));



app.use('/user',userRoute)
app.use('/tag',tagRoute)

app.use('/product',productRoute)

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });



mongoose.connect(process.env.mongoPath, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connecting to Database")
    app.listen(5000)
    console.log("listening at port [5000]")
}).catch((err)=>{
    console.log(err)
})

