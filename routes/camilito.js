const express = require('express');
const router = express.Router();
const navOptions = require('./navOptions');

router.get('/', (r, e) => {
    e.render('camilito', {navOptions: navOptions});
});

module.exports = router;
