'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../../config/config');
const handleBiTHeaders = require('../../../headerhandler');

router.post('/', (req, res) => {
  let ticker = req.body.ticker;
  let amount = req.body.amount;
  let originwalletuniqueidentifier = req.body.originwalletuniqueidentifier;
  let destinationwalletuniqueidentifier = req.body.destinationwalletuniqueidentifier;
  let destinationclientforeignkey = req.body.destinationclientforeignkey;
  let destinationaddress = req.body.destinationaddress;

  if (!ticker || !amount || !originwalletuniqueidentifier || (!destinationwalletuniqueidentifier && !destinationaddress && !destinationclientforeignkey)) {
    return res.status(400).json({
      success : false,
      message : "missing required fields"
    });
  }
  let comment = req.body.comment;

  handleBiTHeaders.hashKey(config.apiprivatekey)
  .then((apihashedkey) => {
    let params = {
      url : config.urlToBit + '/transactions/' + ticker,
      headers : {
        apipublickey : config.apipublickey,
        apihashedkey : apihashedkey
      },
      json : true,
      body : {
        amount : amount,
        comment : comment,
        originwalletuniqueidentifier : originwalletuniqueidentifier,
        destinationwalletuniqueidentifier : destinationwalletuniqueidentifier,
        destinationaddress : destinationaddress,
        destinationclientforeignkey : destinationclientforeignkey
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
          message: error.message
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