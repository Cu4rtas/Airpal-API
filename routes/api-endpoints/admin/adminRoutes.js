const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');
const crypto = require('crypto');
const pojo = require('../../../POJOS/pjadmin');

router.get("/", function(req, res, next) {
    tables.Admin.getAll((err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

router.post('/login', function(req, res, next){
    ID = req.body.id;
    PASSWORD = crypto.createHash('md5').update(req.body.password).digest("hex");
    console.log(req.body);
    tables.Admin.get(ID, PASSWORD, (err, rows) => {
        if(err) throw err;
        if(rows.length === 0){
            res.send("USER NOT FOUND");
        } else {
            console.log(rows[0]);
            res.json(rows[0]);
        }
    });
});

router.post('/register', function(req, res, next){
    pojo.ID = req.body.id;
    pojo.NAME = req.body.name;
    pojo.LASTNAME = req.body.lastname;
    pojo.PASSWORD = crypto.createHash('md5').update(req.body.password).digest("hex");
    tables.Admin.insert(pojo, (response) => {
        res.send(response);
    });
});

module.exports = router;