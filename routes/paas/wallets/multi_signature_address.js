'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../../config/config');
const handleBiTHeaders = require('../../../headerhandler');


router.post('/', (req, res) => {
    let ticker = req.body.ticker;
    let numberRequired = req.body.numberRequired;
    let walletuniqueidentifier1 = req.body.walletuniqueidentifier1;
    let walletuniqueidentifier2 = req.body.walletuniqueidentifier2;
    if (!ticker || !walletuniqueidentifier1 || !walletuniqueidentifier2) {
        return res.status(400).json({
            success : false,
            message : "missing required fields"
        });
    }

    let newBody = {
      numberRequired : numberRequired,
      walletuniqueidentifiers : [
        walletuniqueidentifier1,
        walletuniqueidentifier2
      ]
    }

    handleBiTHeaders.hashKey(config.apiprivatekey)
    .then((apihashedkey) => {
        let params = {
            url : config.urlToBit + '/wallets/' + ticker.toLowerCase() + '/multisignature',
            headers : {
                apipublickey : config.apipublickey,
                apihashedkey : apihashedkey
            },
            json : true,
            body: newBody
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