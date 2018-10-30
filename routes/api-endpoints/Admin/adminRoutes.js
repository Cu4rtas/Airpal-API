const express = require('express');
const router = express.Router();
const tables =  require('../../../database/tables');

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
    tables.Admin.get(ID, PASSWORD, (rows) => {
        if(rows) res.send(rows);
        res.send("USER NOT FOUND");
    });
});

module.exports = router;