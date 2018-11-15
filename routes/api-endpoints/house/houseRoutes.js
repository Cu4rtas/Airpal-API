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
    tables.House.getHouseVariables(req.query.houseid, (err, rows) => {
        if(err)throw err;
        console.log(rows);
        res.json(rows);
    });
});

router.get('/RT', (req, res) => {
    console.log(req.query.houseid);
    tables.House.getHouseRT(req.query.houseid, (rows) => {
        console.log(rows);
        res.json(rows[0]);
    });
});

router.post("/register", (req, res) => {
    let houseInsert = {},
         installationInsert = {};
    Object.keys(pojoHouse).forEach(key => {
        houseInsert[key] = req.body[key];
    });
    houseInsert.ID = '0';
    console.log(houseInsert);
    tables.House.insert(houseInsert, (err, resHouse)=> {
        console.log("INSERTÓ HP");
        if(err) throw err;
        if(resHouse){
            console.log(resHouse);
            installationInsert.HOUSECODE = resHouse.insertId;
            installationInsert.INSTALLER = req.body.INSTALLER;
            installationInsert.INSTALLDATE = new Date().toLocaleDateString();
            console.log(installationInsert);
            tables.Installation.insert(installationInsert, (resInst) => {
                if(resInst){
                    let houseRes = houseInsert;
                    houseRes.DISPLAY = resInst.insertId;
                    houseRes.INSTALLER = installationInsert.INSTALLER;
                    //SEND THE DISPLAY CODE TO THE CLIENT
                    console.log(houseRes);
                    res.send(houseRes);
                }
            });
        }
     });
});

module.exports = router;