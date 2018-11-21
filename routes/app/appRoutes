const express = require('express');
const router = express.Router();
const routers = require('./appRouters');
const sessionsMiddleware = require('./sessionsMiddleware');

router.use('/*', sessionsMiddleware);
router.use('/*', (req, res, next) => {
    /**
     * Mandar el navOptions y que siga la fiesta
     */
    next();
});
router.use('/index', routers.indexRouter);
router.use('/houses', routers.housesRouter);
router.use('/config', routers.configRouter);
router.use('/admins', routers.adminRouter);
router.get('/', (req, res) => {
    res.redirect('/app/index');
});

router.get('/logout', (req, res) => {
    res.redirect("/app/houses");
});


module.exports = router;
