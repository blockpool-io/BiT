'use strict';
const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config/config');
const addBitHeaders = require('../../handleBiTHeaders');


router.post('/', (req, res) => {
    let bitid = req.body.bitid;
    if (!bitid) {
        return res.status(400).json({
            success : false,
            message : "missing required fields"
        });
    }

    addBitHeaders.hashKey(config.apiprivatekey)
    .then((apihashedkey) => {
        let params = {
            url : config.urlToBit + '/organisations/users/' + bitid,
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