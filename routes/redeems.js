const express = require('express');
const router = express.Router();
const {Voucher} = require('../models/voucher');

router.post('/', async (req,res) =>{
    const {error} = validateRedeem(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const voucherDetails = await Voucher
    .find({voucherPin: req.body.voucherPin})
    .populate('details','email -_id',)
    .select('voucherCode voucherPin voucherWorth voucherUsage -_id')

    console.log('-------------', voucherDetails)
    var redeemEmail = req.body.email
    var voucherEmail = voucherDetails[0].details.email
    var resultEmail = redeemEmail.localeCompare(voucherEmail)
    console.log('---Remail----',resultEmail)

    var redeemPin = req.body.voucherPin
    var voucherPin = voucherDetails[0].voucherPin
    var resultPin = redeemPin.localeCompare(voucherPin)
    console.log('---Rpin----',resultPin);

    let count = voucherDetails[0].voucherUsage
    console.log('count',count);

    if(((resultEmail && resultPin) === 0) && count<5){
            let voucherWorth = voucherDetails[0].voucherWorth;
            console.log('vw',voucherWorth);
            voucherWorth = voucherWorth- req.body.redeemAmount
            console.log('updated',voucherWorth);
            count = count+1;
            console.log('ipcount',count);
    
            const finalVoucher = await Voucher.update({voucherPin : req.body.voucherPin},{
                $set: { 
                    voucherWorth: voucherWorth, // 900 in Vouchers collection 2) 700
                    voucherUsage: count
                }
            })
            console.log('+++++',finalVoucher)
    }
})

module.exports = router;