const config = require('config')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv/config')
var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const {Voucher,Detail, validate} = require('../models/voucher');

router.post("/",async (req,res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let  email = new Detail({ 
        name: req.body.name,
        email: req.body.email,
        isGenerated: true
    })
    email = await email.save()
    let d = new Date();
    let voucher = new Voucher({
        voucherCode: 'VCD'+ getId(10),
        voucherPin: getId(5),
        voucherWorth: 1000,
        voucherUsage:0,
        voucherCreatedTime: d.getHours(),
        voucherEndTime: d.getHours()+24,
        details: email
    })
    voucher = await voucher.save()
    console.log('voucher', voucher)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO_EMAIL,
        subject: 'Voucher Management System',
        html: `<p>Hi You have successfully registered. Please find the Voucher detials 
        Voucher Code : ${voucher.voucherCode},
        Voucher Pin : ${voucher.voucherPin},
        Voucher Worth : ${voucher.voucherWorth},
        </p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
    const token = jwt.sign({ _id : email._id}, config.get('jwtPrivateKey'));

    res.send(voucher)
})

function getId(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;