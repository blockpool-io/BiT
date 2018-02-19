'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    hashKey : hashKey
};

function hashKey(privatekey) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(privatekey, salt, (err, apihashedkey) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(apihashedkey);
                }
            });
        }); 
    });
};