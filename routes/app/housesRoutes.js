const express = require('express');
const router = express.Router();
const navOptions = require('./navOptions');
const tables = require('../../database/tables');

router.get('/', (req, res) => {
    tables.House.getAllInstallations((err, rows) => {
        if(err) throw err;
        res.render('houses', {
           navOptions: navOptions,
           houses: rows
       })
    });
});


module.exports = router;
