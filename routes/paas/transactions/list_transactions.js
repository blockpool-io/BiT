'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../../config/config');
const handleBiTHeaders = require('../../../headerhandler');

router.post('/', (req, res) => {
  let ticker = req.body.ticker;
  let address = req.body.address;
  let walletuniqueidentifier = req.body.walletuniqueidentifier;
  let clientforeignkey = req.body.clientforeignkey;
  let limit = req.body.limit;
  if (!ticker || (!address && !walletuniqueidentifier && !clientforeignkey)) {
    return res.status(400).json({
      success : false,
      message : "missing required fields"
    });
  }

  let filter = { };
  if (address) {
    filter.address = address;
  }
  if (walletuniqueidentifier) {
    filter.walletuniqueidentifier = walletuniqueidentifier;
  }
  if (clientforeignkey) {
    filter.clientforeignkey = clientforeignkey;
  }
  if (limit) {
    filter.limit = limit;
  }

  let encodedFilter = new Buffer(JSON.stringify(filter)).toString('base64')

  handleBiTHeaders.hashKey(config.apiprivatekey)
  .then((apihashedkey) => {
    let params = {
      url : config.urlToBit + '/transactions/' + ticker + '/list/' + encodedFilter,
      headers : {
        apipublickey : config.apipublickey,
        apihashedkey : apihashedkey
      },
      json : true
    };

    request.get(params, (error, response, body) => {
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