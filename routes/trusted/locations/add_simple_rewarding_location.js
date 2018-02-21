'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../../config/config');
const handleBiTHeaders = require('../../../headerhandler');

router.post('/', (req, res) => {
  let ticker = req.body.ticker;
  let locationlabel = req.body.locationlabel;
  let rewardingbitid = req.body.rewardingbitid;
  let rewardingwalletid = req.body.rewardingwalletid;
  let amount = req.body.amount;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let proximity = req.body.proximity;
  let disabled = req.body.disabled;
  if (!ticker || !locationlabel || !rewardingbitid || !rewardingwalletid || !amount || !latitude || !longitude || !proximity || disabled === undefined) {
    return res.status(400).json({
      success : false,
      message : "missing required fields"
    });
  }

  delete req.body.ticker;
  
  handleBiTHeaders.hashKey(config.apiprivatekey)
  .then((apihashedkey) => {
    let params = {
      url : config.urlToBit + '/organisations/locations/' + ticker,
      headers : {
        apipublickey : config.apipublickey,
        apihashedkey : apihashedkey
      },
      json : true,
      body : req.body
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