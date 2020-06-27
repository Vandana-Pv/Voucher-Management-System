const Joi = require('@hapi/joi');
const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true},
    isGenerated: Boolean // Voucher code, voucher pin, voucher worth is generated or not
                         // Required for 3) Get Vouchers API 
})

const voucherSchema = new mongoose.Schema({
    voucherCode:  String,
    voucherPin: String,
    voucherWorth: Number,
    voucherCreatedTime: Date,
    voucherEndTime: Date,
    voucherUsage: Number,
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Detail'
    } 
})

const Detail = mongoose.model('Detail', detailSchema);
const Voucher = mongoose.model('Voucher', voucherSchema);


function validateEmail(email){
    const schema = Joi.object ({
        name: Joi.string(),
        email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        isGenerated: Joi.boolean()       
    })

    return schema.validate(email)
}

exports.Detail = Detail;
exports.validate = validateEmail;
exports.Voucher = Voucher;