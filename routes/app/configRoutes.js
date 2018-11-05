const express = require('express');
const router = express.Router();
const navOptions = require('./navOptions');


router.get('/', (req, res) => {
    res.render('index', {navOptions: navOptions});
});


module.exports = router;
