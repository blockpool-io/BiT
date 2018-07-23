'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../../config/config');
const handleBiTHeaders = require('../../../headerhandler');


router.post('/', (req, res) => {
    let ticker = req.body.ticker;
    if (!ticker) {
        return res.status(400).json({
            success : false,
            message : "missing required fields"
        });
    }

    let body = { };
    if (req.body.quantity) {
      body.quantity = req.body.quantity;
    } else {
      body.clientforeignkeys = [];
      if (req.body.clientforeignkey1) {
        body.clientforeignkeys.push(req.body.clientforeignkey1);
      }
      if (req.body.clientforeignkey2) {
        body.clientforeignkeys.push(req.body.clientforeignkey2);
      }
      if (req.body.clientforeignkey3) {
        body.clientforeignkeys.push(req.body.clientforeignkey3);
      }
      if (req.body.clientforeignkey4) {
        body.clientforeignkeys.push(req.body.clientforeignkey4);
      }
      if (req.body.clientforeignkey5) {
        body.clientforeignkeys.push(req.body.clientforeignkey5);
      }
      if (req.body.clientforeignkey6) {
        body.clientforeignkeys.push(req.body.clientforeignkey6);
      }
      if (body.clientforeignkeys.length === 0) {
        return res.status(400).json({
          success : false,
          message : "missing required fields"
        });
      }
    } 

    handleBiTHeaders.hashKey(config.apiprivatekey)
    .then((apihashedkey) => {
        let params = {
            url : config.urlToBit + '/wallets/' + ticker.toLowerCase() + '/bulk',
            headers : {
                apipublickey : config.apipublickey,
                apihashedkey : apihashedkey
            },
            json : true,
            body : body
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