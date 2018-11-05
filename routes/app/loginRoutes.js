const express = require('express');
const router = express.Router();
const tables = require('../../database/tables');

router.get('/', (req, res) => {
   res.render('login');
});

router.post('/', (req, res) => {
    console.log(req.body);
    tables.Admin.get(req.body.id, req.body.password, (err, rows) => {
        if(err) throw err;
        if(rows.length === 0){
            res.render('login', {msg: 'User not found'});
        } else {
            console.log(rows[0]);
            req.session.user_id = rows[0].ID;
            res.redirect('/app');
        }
    });
});


module.exports = router;