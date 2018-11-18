const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');
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
    ID = req.body.ID;
    PASSWORD = req.body.PASSWORD;
    console.log(req.body);
    tables.Admin.get(ID, PASSWORD, (err, rows) => {
        if(err) throw err;
        if(rows){
            console.log("USER FOUND");
            res.json(rows[0]);
        } else {
            console.log("USER NOT FOUND");
            res.send("USER NOT FOUND");
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


router.get('/installations', (req, res) => {
    tables.Admin.getAdminInstallations(req.query.adminid, (err, rows) => {
       if(err) throw err;
        res.send(rows);
    });
});

module.exports = router;