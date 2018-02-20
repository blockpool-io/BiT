'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config/config');
const handleBiTHeaders = require('../../headerhandler');

router.post('/', (req, res) => {
  let ticker = req.body.ticker;
  let amount = req.body.amount;
  let originbitid = req.body.originbitid;
  let originwalletid = req.body.originwalletid;

  if (!ticker || !amount || !originbitid || !originwalletid) {
    return res.status(400).json({
      success : false,
      message : "missing required fields"
    });
  }

  let destinationbitid = req.body.destinationbitid;
  let destinationwalletid = req.body.destinationwalletid;

  let destinationaddress = req.body.destinationaddress;

  let destination = {};

  if (destinationaddress) {
    destination.address = destinationaddress;
  } else if (destinationbitid && destinationwalletid) {
    destination.bitid = destinationbitid;
    destination.walletid = destinationwalletid;
  } else {
    return res.status(400).json({
      success : false,
      message : "missing required fields"
    });
  }

  let comment = req.body.comment;

  handleBiTHeaders.hashKey(config.apiprivatekey)
  .then((apihashedkey) => {
    let params = {
      url : config.urlToBit + '/organisations/transactions/' + ticker,
      headers : {
        apipublickey : config.apipublickey,
        apihashedkey : apihashedkey
      },
      json : true,
      body : {
        amount : amount,
        comment : comment,
        origin : {
          bitid : originbitid,
          walletid : originwalletid
        },
        destination : destination
      }
    };

    request.post(params, (error, response, body) => {
      if (error) {
        let statusCode = 500;
        if (response) {
          statusCode = response.statusCode;
        }
        return res.status(statusCode).json({
          success : false,
          message: error,message
        });
      } else {
        return res.status(response.statusCode).json(body);
      }
    });
  })
  .catch((err) => {
    return res.status(401).json({
      success : false,
      message: err.message
    });
  });
});

module.exports = router;