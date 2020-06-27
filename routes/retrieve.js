const express = require('express');
const router = express.Router();
const {Voucher} = require('../models/voucher');

router.get('/', async (req,res) =>{
    const voucherDetails = await Voucher
    .find()
    .populate('details','email -_id',)
    .select('voucherCreatedTime voucherEndTime -_id')
    res.send(voucherDetails)
})

module.exports = router;