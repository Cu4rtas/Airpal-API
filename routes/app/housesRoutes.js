const express = require('express');
const router = express.Router();
const navOptions = require('./navOptions');
const tables = require('../../database/tables');


router.get('/', (req, res) => {
    tables.House.getAllInstallations((err, rows) => {
        if(err) throw err;
        console.log(rows);
        res.render('houses', {
            navOptions: navOptions,
            houses: rows
       })
    });
});


router.get('/:houseid', (req, res) => {
    tables.House.get(req.params.houseid, (err, rows) => {
       if(err) throw err;
       let houseinfo = rows[0];
       tables.House.getDisplayStatus(req.params.houseid, (err, rows) => {
           let displayStatus = rows[0];
           console.log(displayStatus);
            res.render('houseinfo', {
                navOptions: navOptions,
                house: houseinfo,
                displayStatus: displayStatus
            });
        });
    });
});

router.get('/:houseid/variables', (req, res) => {
    tables.House.getHouseVariables(req.params.houseid, (err, rows) => {
        if(err) throw err;
        res.render('housevariables', {
            navOptions: navOptions,
            houseid: req.params.houseid
        });
    });
});

router.get('/:houseid/rt', (req, res) => {
    tables.House.getHouseVariables(req.params.houseid, (err, rows) => {
        if(err) throw err;
        res.render('housert', {
            navOptions: navOptions,
            variables: rows,
            houseid: req.params.houseid
        });
    });
});

module.exports = router;
