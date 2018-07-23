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

    handleBiTHeaders.hashKey(config.apiprivatekey)
    .then((apihashedkey) => {
        let params = {
            url : config.urlToBit + '/wallets/' + ticker.toLowerCase(),
            headers : {
                apipublickey : config.apipublickey,
                apihashedkey : apihashedkey
            },
            json : true
        };
        let clientforeignkey = req.body.clientforeignkey;
        if (clientforeignkey) {
          params.body = {
            clientforeignkey : clientforeignkey
          };
        }
    
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