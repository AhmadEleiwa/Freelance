const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/user-route');
const productRoute = require('./routes/product-route')
const  mongoose  = require('mongoose');
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

app.use('/user',userRoute)

app.use('/product',productRoute)

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });



mongoose
.connect('mongodb+srv://sico:sico@cluster0.pahqx.mongodb.net/freelance?retryWrites=true&w=majority')
.then(()=>{
    console.log("connecting to Database")
    app.listen(5000)
    console.log("listening at port [5000]")
}).catch((err)=>{
    console.log(err)
})

