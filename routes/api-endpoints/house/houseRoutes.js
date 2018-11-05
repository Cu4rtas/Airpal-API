const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');
const pojoHouse = require('../../../POJOS/pjhouse');
const pojoInstallation = require('../../../POJOS/pjinstallation');

router.get("/", (req, res) => {
    tables.House.getAll(rows => {
        res.json(rows);
    });
});

router.get('/display', (req, res) => {
    tables.House.getHouseDisplay(req, rows => {
        res.json(rows);
    });
});

router.get('/variables', (req, res) => {
    tables.House.getHouseVariables(req.query.houseid, (rows) => {
        res.json(rows);
    });
});

router.get('/RT', (req, res) => {
    console.log(req);
    tables.House.getHouseRT(req.query.houseid, (rows) => {
        res.json(rows[0]);
    });
});

router.post("/register", (req, res) => {
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
    pojoInstallation.INSTALLDATE = new Date().toLocaleDateString();
    pojoInstallation.INSTALLER = req.body.installer;
    console.log(req.body);
    console.log(pojoHouse);
    tables.House.insert(pojoHouse, (resHouse)=> {
        if(resHouse){
            console.log(resHouse);
            pojoInstallation.HOUSECODE = resHouse.insertId;
            console.log(pojoInstallation);
            tables.Installation.insert(pojoInstallation, (resInst) => {
                if(resInst){
                    //SEND THE DISPLAY CODE TO THE CLIENT
                    res.send('Registro exitoso. Número del dispositivo: ' + resInst.insertId);
                }
            });
        }
     });
});

module.exports = router;