const express = require('express');
const router = express.Router();
const houseRouter = require('./house/houseRoutes');
const adminRouter = require('./admin/adminRoutes');
const queriesRouter = require('./queries/queriesRoutes');
const tables =  require('../../database/tables');
const navOptions = require('../app/navOptions');

/**
 * The response for this request is the render of the file index.html
 * and the server will send a list with the tables that this are in @tables
**/
router.get('/', function(req, res, next) {
  //res.render('index', {navOptions: navOptions, lista: tables});
    res.redirect("/app");
});


/**
Ejecuta la función getAll() del modelo Activity para obtener todos
los registros que hayan en la tabla de la db para enviarlos
como JSON
**/
router.get(tables.Activity.href, function(req, res, next) {
  tables.Activity.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.use(tables.Admin.href, adminRouter);

router.use('/queries', queriesRouter);

router.get(tables.Alarmconf.href, function(req, res, next) {
  tables.Alarmconf.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Alarms.href, function(req, res, next) {
  tables.Alarms.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.DetailHouse.href, function(req, res, next) {
  tables.DetailHouse.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Display.href, function(req, res, next) {
  tables.Display.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.use(tables.House.href, houseRouter);

router.get(tables.Installation.href, function(req, res, next) {
  tables.Installation.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.RT.href, function(req, res, next) {
  tables.RT.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

router.get(tables.Variables.href, function(req, res, next) {
  tables.Variables.getAll((err, data) => {
    if (err) {
      throw err;
    } else {
        res.json(data);
    }
  });
});

module.exports = router;
