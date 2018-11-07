const express = require('express');
const router = express.Router();
const navOptions = require('./navOptions');
const tables = require('../../database/tables');

router.get('/', (req, res) => {
    tables.Admin.getAll((err, rows) => {
        if(err) throw err;
        res.render('admins', {
            navOptions: navOptions,
            admins: rows
        });
        console.log(rows);
    });
});

router.get('/register', (req, res) => {
    res.render('adminRegister', {navOptions: navOptions});
});

module.exports = router;
