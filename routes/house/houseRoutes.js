const express = require('express');
const router = express.Router();
const tables =  require('../../database/tables');

router.get("/", function(req, res, next) {
    tables.House.getAll((err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});

const pojo = require('../../POJOS/pjhouse');

router.post("/insert", (req, res) => {
    pojo.ID = "0";
    pojo.NAME = req.body.NAME;
    pojo.LASTNAME = req.body.LASTNAME;
    pojo.EMAIL = req.body.EMAIL;
    pojo.TELNUMBER = req.body.TELNUMBER;
    pojo.ADDRESS = req.body.ADDRESS;
    pojo.RESIDENTNUMBER = req.body.RESIDENTNUMBER;
    pojo.FLOORNUMBER = req.body.FLOORNUMBER;
    pojo.REVOKEHOUSE = req.body.REVOKEHOUSE;
    pojo.SMOKERSNUMBER = req.body.SMOKERSNUMBER;
    pojo.PETSNUMBER = req.body.PETSNUMBER;
    pojo.FLOORMATERIAL = req.body.FLOORMATERIAL;
    pojo.WALLSMATERIAL = req.body.WALLSMATERIAL;
    pojo.PAINTTYPE = req.body.PAINTTYPE;
    pojo.ALTITUDE = req.body.ALTITUDE;
    pojo.LATITUDE = req.body.LATITUDE;
    console.log(req.body);
    tables.House.insert((res)=> {
        res.send(res);
     }, pojo);
});

module.exports = router;