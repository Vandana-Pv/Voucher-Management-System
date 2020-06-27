const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const voucherGenerate = require('./routes/generates');
const voucherRedeem = require('./routes/redeems');
const retrieveVoucher = require('./routes/retrieve')
const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR : JWT key is not defined')
    process.exit(1)
}

app.use(express.json())
app.use(express.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost/voucher')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB', err))

app.use('/vouchergenerate',voucherGenerate);
app.use('/voucherredeem',voucherRedeem);
app.use('/retrievevoucher',retrieveVoucher);

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Express app started on port 4000");
});