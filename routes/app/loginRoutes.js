const express = require('express');
const router = express.Router();
const tables = require('../../database/tables');

router.get('/', (req, res) => {
   res.render('login');
});

router.post('/', (req, res) => {
    console.log(req.body);
    tables.Admin.get(req.body.id, req.body.password, (err, result) => {
        if(err) throw err;
        let user = result[0];
        console.log(user);
        if(user) {
            console.log('oa');
            req.session.user_id = user.ID;
            res.redirect('/app');
        } else {
            res.render('login', {msg: "Usuario no encontrado"});
        }
    });
});


module.exports = router;