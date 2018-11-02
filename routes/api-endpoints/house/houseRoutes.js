const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');
const pojoHouse = require('../../../POJOS/pjhouse');
const pojoInstallation = require('../../../POJOS/pjinstallation');

router.get("/", function(req, res, next) {
    tables.House.getAll((err, data) => {
        if (err) {
            throw err;
        } else {
            res.json(data);
        }
    });
});


router.post("/register", (req, res) => {
    pojoHouse.ID = "0";
    pojoHouse.NAME = req.body.name;
    pojoHouse.LASTNAME = req.body.lastname;
    pojoHouse.EMAIL = req.body.email;
    pojoHouse.TELNUMBER = req.body.phone;
    pojoHouse.ADDRESS = req.body.address;
    pojoHouse.RESIDENTNUMBER = req.body.residentnumber;
    pojoHouse.FLOORNUMBER = req.body.floornumber;
    pojoHouse.REVOKEHOUSE = req.body.revokehouse;
    pojoHouse.SMOKERSNUMBER = req.body.smokersnumber;
    pojoHouse.PETSNUMBER = req.body.petsnumber;
    pojoHouse.FLOORMATERIAL = req.body.floormaterial;
    pojoHouse.WALLSMATERIAL = req.body.wallsmaterial;
    pojoHouse.PAINTTYPE = req.body.painttype;
    pojoHouse.ALTITUDE = req.body.altitude;
    pojoHouse.LATITUDE = req.body.latitude;
    pojoInstallation.DISPLAY = req.body.display;
    pojoInstallation.INSTALLDATE = req.body.installdate;
    pojoInstallation.INSTALLER = req.body.installer;
    console.log(req.body);
    console.log(pojoHouse);
    tables.House.insert((resHouse)=> {
        if(resHouse){
            console.log(resHouse);
            pojoInstallation.HOUSECODE = resHouse.insertId;
            console.log(pojoInstallation);
            tables.Installation.insert(pojoInstallation, (resInst) => {
                if(resInst){
                    res.send("Register complete" + resHouse + resInst);
                }
            });
        }
     }, pojoHouse);
});

module.exports = router;