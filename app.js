const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');




require('dotenv').config();
// imports routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const serviceRoutes = require('./routes/service');
const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');
const orderRoutes = require('./routes/order');
const detailRoutes = require('./routes/detail');
const contactRoutes = require('./routes/contact');








//app
const app = express();

//db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(() => console.log("DB Connected"));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());




// routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',serviceRoutes);
app.use('/api',braintreeRoutes);



// app.use('/api',orderRoutes);
app.use('/api',orderRoutes);
app.use('/api',detailRoutes);
app.use('/api',contactRoutes);






const port = process.env.PORT || 8000


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});











