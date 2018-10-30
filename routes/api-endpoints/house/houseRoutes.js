const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');

router.get("/", function(req, res, next) {
    tables.House.getAll((err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

const pojo = require('../../../POJOS/pjhouse');

router.post("/register", (req, res) => {
    pojo.ID = "0";
    pojo.NAME = req.body.name;
    pojo.LASTNAME = req.body.lastname;
    pojo.EMAIL = req.body.email;
    pojo.TELNUMBER = req.body.phone;
    pojo.ADDRESS = req.body.address;
    pojo.RESIDENTNUMBER = req.body.residentnumber;
    pojo.FLOORNUMBER = req.body.floornumber;
    pojo.REVOKEHOUSE = req.body.revokehouse;
    pojo.SMOKERSNUMBER = req.body.smokersnumber;
    pojo.PETSNUMBER = req.body.petsnumber;
    pojo.FLOORMATERIAL = req.body.floormaterial;
    pojo.WALLSMATERIAL = req.body.wallsmaterial;
    pojo.PAINTTYPE = req.body.painttype;
    pojo.ALTITUDE = req.body.altitude;
    pojo.LATITUDE = req.body.latitude;
    console.log(req.body);
    console.log(pojo);
    tables.House.insert((result)=> {
        res.send(result);
     }, pojo);
});

module.exports = router;